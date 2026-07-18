#include <iostream>
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"
#include <cmath>
#include <algorithm>
#include <random>
#include<vector>
#include <emscripten/bind.h>

struct RGB {
    float r;
    float g;
    float b;
};

struct Image {
    int width = 0;
    int height = 0;
    std::vector<RGB> pixels;
};

Image load_image(const std::string& filename) {
    int width, height, channels;
    unsigned char* img_data = stbi_load(filename.c_str(), &width, &height, &channels, 3);

    if (!img_data) {
        std::cerr << "Error loading image: " << stbi_failure_reason() << std::endl;
        return {0, 0, {}};
    }

    Image img;
    img.width = width;
    img.height = height;
    img.pixels.resize(width * height);

    int total_pixels = width * height;
    for (int i = 0; i < total_pixels; ++i) {
        int idx = i * 3;
        img.pixels[i].r = static_cast<float>(img_data[idx]);
        img.pixels[i].g = static_cast<float>(img_data[idx + 1]);
        img.pixels[i].b = static_cast<float>(img_data[idx + 2]);
    }

    stbi_image_free(img_data);
    return img;
}

void save_image(const Image& img, const std::string& filename, int quality = 90) {
    if (img.pixels.empty()) return;

    int total_pixels = img.width * img.height;
    std::vector<unsigned char> rgb_buffer(total_pixels * 3);

    for (int i = 0; i < total_pixels; ++i) {
        int idx = i * 3;
        rgb_buffer[idx]     = static_cast<unsigned char>(std::clamp(std::lround(img.pixels[i].r), 0l, 255l));
        rgb_buffer[idx + 1] = static_cast<unsigned char>(std::clamp(std::lround(img.pixels[i].g), 0l, 255l));
        rgb_buffer[idx + 2] = static_cast<unsigned char>(std::clamp(std::lround(img.pixels[i].b), 0l, 255l));
    }

    stbi_write_jpg(filename.c_str(), img.width, img.height, 3, rgb_buffer.data(), quality);
}

Image mean_blur(const Image& img, int k) {
    if (k < 2 || img.pixels.empty()) return img;
    Image out = img;
    int r = k / 2;
    int w = img.width;
    int h = img.height;

    for (int y = 0; y < h; ++y) {
        for (int x = 0; x < w; ++x) {
            float sum_r = 0, sum_g = 0, sum_b = 0;
            int count = 0;
            int y1 = std::max(0, y - r), y2 = std::min(h - 1, y + r);
            int x1 = std::max(0, x - r), x2 = std::min(w - 1, x + r);

            for (int cy = y1; cy <= y2; ++cy) {
                int row_offset = cy * w;
                for (int cx = x1; cx <= x2; ++cx) {
                    const RGB& p = img.pixels[row_offset + cx];
                    sum_r += p.r; sum_g += p.g; sum_b += p.b;
                    count++;
                }
            }
            int idx = y * w + x;
            float inv_count = 1.0f / count;
            out.pixels[idx] = {sum_r * inv_count, sum_g * inv_count, sum_b * inv_count};
        }
    }
    return out;
}

Image gaussian_blur(const Image& img, int k) {
    if (k % 2 == 0 || k < 3 || img.pixels.empty()) return img;
    int w = img.width, h = img.height;
    Image temp = img, out = img;

    int r = k / 2;
    std::vector<float> kernel(r + 1);
    float sigma = std::max(0.5f, k / 6.0f);
    kernel[0] = 1.0f;
    float norm = 1.0f;

    for (int i = 1; i <= r; ++i) {
        kernel[i] = std::exp(-(i * i) / (2.0f * sigma * sigma));
        norm += kernel[i] * 2.0f;
    }
    for (int i = 0; i <= r; ++i) kernel[i] /= norm;

    // Horizontal pass
    for (int y = 0; y < h; ++y) {
        int row_offset = y * w;
        for (int x = 0; x < w; ++x) {
            float sr = 0, sg = 0, sb = 0;
            int x1 = std::max(0, x - r), x2 = std::min(w - 1, x + r);
            for (int cx = x1; cx <= x2; ++cx) {
                float kw = kernel[std::abs(cx - x)];
                const RGB& p = img.pixels[row_offset + cx];
                sr += p.r * kw; sg += p.g * kw; sb += p.b * kw;
            }
            temp.pixels[row_offset + x] = {sr, sg, sb};
        }
    }

    // Vertical pass
    for (int y = 0; y < h; ++y) {
        int y1 = std::max(0, y - r), y2 = std::min(h - 1, y + r);
        for (int x = 0; x < w; ++x) {
            float sr = 0, sg = 0, sb = 0;
            for (int cy = y1; cy <= y2; ++cy) {
                float kw = kernel[std::abs(cy - y)];
                const RGB& p = temp.pixels[cy * w + x];
                sr += p.r * kw; sg += p.g * kw; sb += p.b * kw;
            }
            int idx = y * w + x;
            out.pixels[idx] = {
                std::clamp(sr, 0.0f, 255.0f),
                std::clamp(sg, 0.0f, 255.0f),
                std::clamp(sb, 0.0f, 255.0f)
            };
        }
    }
    return out;
}

Image exposure(const Image& img, float factor) {
    Image out = img;
    for (auto& p : out.pixels) {
        p.r = std::clamp(p.r * factor, 0.0f, 255.0f);
        p.g = std::clamp(p.g * factor, 0.0f, 255.0f);
        p.b = std::clamp(p.b * factor, 0.0f, 255.0f);
    }
    return out;
}

Image contrast(const Image& img, float factor) {
    Image out = img;
    const float anchor = 128.0f;
    for (auto& p : out.pixels) {
        p.r = std::clamp((p.r - anchor) * factor + anchor, 0.0f, 255.0f);
        p.g = std::clamp((p.g - anchor) * factor + anchor, 0.0f, 255.0f);
        p.b = std::clamp((p.b - anchor) * factor + anchor, 0.0f, 255.0f);
    }
    return out;
}

Image saturation(const Image& img, float factor) {
    Image out = img;
    for (auto& p : out.pixels) {
        float grey = 0.299f * p.r + 0.587f * p.g + 0.114f * p.b;
        p.r = std::clamp(grey + factor * (p.r - grey), 0.0f, 255.0f);
        p.g = std::clamp(grey + factor * (p.g - grey), 0.0f, 255.0f);
        p.b = std::clamp(grey + factor * (p.b - grey), 0.0f, 255.0f);
    }
    return out;
}

Image histogram_equalization(const Image& img) {
    if (img.pixels.empty()) return img;
    int total_pixels = img.width * img.height;
    std::vector<int> hist(256, 0);
    std::vector<float> luminance(total_pixels);

    // Calculate luminance histogram
    for (int i = 0; i < total_pixels; ++i) {
        float lum = 0.299f * img.pixels[i].r + 0.587f * img.pixels[i].g + 0.114f * img.pixels[i].b;
        luminance[i] = lum;
        hist[std::clamp(static_cast<int>(lum), 0, 255)]++;
    }

    // Compute Cumulative Distribution Function (CDF)
    std::vector<int> cdf(256, 0);
    cdf[0] = hist[0];
    for (int i = 1; i < 256; ++i) cdf[i] = cdf[i - 1] + hist[i];

    // Find first non-zero CDF value for scaling
    int cdf_min = 0;
    for (int i = 0; i < 256; ++i) {
        if (cdf[i] > 0) { cdf_min = cdf[i]; break; }
    }

    // Equalize
    Image out = img;
    float scale = 255.0f / (total_pixels - cdf_min);
    for (int i = 0; i < total_pixels; ++i) {
        int old_lum = std::clamp(static_cast<int>(luminance[i]), 0, 255);
        float new_lum = std::clamp((cdf[old_lum] - cdf_min) * scale, 0.0f, 255.0f);
        
        // Scale RGB proportionally to luminance change
        float ratio = (old_lum > 0) ? (new_lum / (old_lum + 1e-5f)) : 1.0f;
        out.pixels[i].r = std::clamp(img.pixels[i].r * ratio, 0.0f, 255.0f);
        out.pixels[i].g = std::clamp(img.pixels[i].g * ratio, 0.0f, 255.0f);
        out.pixels[i].b = std::clamp(img.pixels[i].b * ratio, 0.0f, 255.0f);
    }
    return out;
}

Image apply_kernel_3x3(const Image& img, const float kernel[9]) {
    int w = img.width, h = img.height;
    Image out = img;

    for (int y = 1; y < h - 1; ++y) {
        int row_idx = y * w;
        for (int x = 1; x < w - 1; ++x) {
            float sr = 0, sg = 0, sb = 0;
            int k_idx = 0;
            for (int ky = -1; ky <= 1; ++ky) {
                int k_row = (y + ky) * w;
                for (int kx = -1; kx <= 1; ++kx) {
                    const RGB& p = img.pixels[k_row + (x + kx)];
                    float kv = kernel[k_idx++];
                    sr += p.r * kv; sg += p.g * kv; sb += p.b * kv;
                }
            }
            int idx = row_idx + x;
            out.pixels[idx] = {
                std::clamp(sr, 0.0f, 255.0f),
                std::clamp(sg, 0.0f, 255.0f),
                std::clamp(sb, 0.0f, 255.0f)
            };
        }
    }
    return out;
}

Image laplacian(const Image& img) {
    const float kernel[9] = {
        1.0f,  1.0f, 1.0f,
        1.0f, -8.0f, 1.0f,
        1.0f,  1.0f, 1.0f
    };
    return apply_kernel_3x3(img, kernel);
}

Image sharpening(const Image& img) {
    const float kernel[9] = {
         0.0f, -1.0f,  0.0f,
        -1.0f,  5.0f, -1.0f,
         0.0f, -1.0f,  0.0f
    };
    return apply_kernel_3x3(img, kernel);
}

Image gaussian_noise(const Image& img, float mean, float stddev) {
    Image out = img;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::normal_distribution<float> dist(mean, stddev);

    for (auto& p : out.pixels) {
        p.r = std::clamp(p.r + dist(gen), 0.0f, 255.0f);
        p.g = std::clamp(p.g + dist(gen), 0.0f, 255.0f);
        p.b = std::clamp(p.b + dist(gen), 0.0f, 255.0f);
    }
    return out;
}

Image salt_and_pepper(const Image& img, float prob) {
    Image out = img;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<float> dist(0.0f, 1.0f);

    float half_prob = prob / 2.0f;
    for (auto& p : out.pixels) {
        float r = dist(gen);
        if (r < half_prob) {
            p = {0.0f, 0.0f, 0.0f}; // Pepper
        } else if (r < prob) {
            p = {255.0f, 255.0f, 255.0f}; // Salt
        }
    }
    return out;
}

Image canny_edge_detection(const Image& img, float low_thresh, float high_thresh) {
    int w = img.width, h = img.height;
    int total = w * h;

    // Step 1: Convert to Grayscale & apply Gaussian Blur
    Image blurred = gaussian_blur(img, 5);
    std::vector<float> gray(total);
    for (int i = 0; i < total; ++i) {
        gray[i] = 0.299f * blurred.pixels[i].r + 0.587f * blurred.pixels[i].g + 0.114f * blurred.pixels[i].b;
    }

    // Step 2: Sobel Gradient Magnitude & Direction
    std::vector<float> mag(total, 0.0f);
    std::vector<float> angle(total, 0.0f);
    int sx[9] = {-1, 0, 1, -2, 0, 2, -1, 0, 1};
    int sy[9] = {-1, -2, -1, 0, 0, 0, 1, 2, 1};

    for (int y = 1; y < h - 1; ++y) {
        for (int x = 1; x < w - 1; ++x) {
            float gx = 0, gy = 0;
            int k = 0;
            for (int ky = -1; ky <= 1; ++ky) {
                for (int kx = -1; kx <= 1; ++kx) {
                    float val = gray[(y + ky) * w + (x + kx)];
                    gx += val * sx[k];
                    gy += val * sy[k];
                    k++;
                }
            }
            int idx = y * w + x;
            mag[idx] = std::hypot(gx, gy);
            angle[idx] = std::atan2(gy, gx) * (180.0f / M_PI);
            if (angle[idx] < 0) angle[idx] += 180.0f;
        }
    }

    // Step 3: Non-Maximum Suppression (NMS)
    std::vector<float> nms(total, 0.0f);
    for (int y = 1; y < h - 1; ++y) {
        for (int x = 1; x < w - 1; ++x) {
            int idx = y * w + x;
            float q = 255.0f, r = 255.0f;
            float ang = angle[idx];

            if ((ang >= 0 && ang < 22.5f) || (ang >= 157.5f && ang <= 180.0f)) {
                q = mag[y * w + (x + 1)]; r = mag[y * w + (x - 1)];
            } else if (ang >= 22.5f && ang < 67.5f) {
                q = mag[(y + 1) * w + (x - 1)]; r = mag[(y - 1) * w + (x + 1)];
            } else if (ang >= 67.5f && ang < 112.5f) {
                q = mag[(y + 1) * w + x]; r = mag[(y - 1) * w + x];
            } else if (ang >= 112.5f && ang < 157.5f) {
                q = mag[(y - 1) * w + (x - 1)]; r = mag[(y + 1) * w + (x + 1)];
            }

            if (mag[idx] >= q && mag[idx] >= r) nms[idx] = mag[idx];
            else nms[idx] = 0.0f;
        }
    }

    // Step 4: Double Thresholding
    std::vector<int> edges(total, 0); // 0 = non-edge, 1 = weak, 2 = strong
    for (int i = 0; i < total; ++i) {
        if (nms[i] >= high_thresh) edges[i] = 2;
        else if (nms[i] >= low_thresh) edges[i] = 1;
    }

    // Step 5: Edge Tracking by Hysteresis
    for (int y = 1; y < h - 1; ++y) {
        for (int x = 1; x < w - 1; ++x) {
            int idx = y * w + x;
            if (edges[idx] == 1) {
                if (edges[(y+1)*w+x] == 2 || edges[(y-1)*w+x] == 2 ||
                    edges[y*w+(x+1)] == 2 || edges[y*w+(x-1)] == 2 ||
                    edges[(y+1)*w+(x+1)] == 2 || edges[(y-1)*w+(x-1)] == 2) {
                    edges[idx] = 2;
                } else {
                    edges[idx] = 0;
                }
            }
        }
    }

    Image out = img;
    for (int i = 0; i < total; ++i) {
        float val = (edges[i] == 2) ? 255.0f : 0.0f;
        out.pixels[i] = {val, val, val};
    }
    return out;
}

Image flip_horizontal(const Image& img) {
    if (img.pixels.empty()) return img;
    Image out = img;
    int w = img.width, h = img.height;
    
    for (int y = 0; y < h; ++y) {
        int row_offset = y * w;
        for (int x = 0; x < w / 2; ++x) {
            std::swap(out.pixels[row_offset + x], out.pixels[row_offset + (w - 1 - x)]);
        }
    }
    return out;
}

Image flip_vertical(const Image& img) {
    if (img.pixels.empty()) return img;
    Image out = img;
    int w = img.width, h = img.height;
    
    for (int y = 0; y < h / 2; ++y) {
        int top_offset = y * w;
        int bottom_offset = (h - 1 - y) * w;
        for (int x = 0; x < w; ++x) {
            std::swap(out.pixels[top_offset + x], out.pixels[bottom_offset + x]);
        }
    }
    return out;
}

Image crop(const Image& img, int start_x, int start_y, int crop_w, int crop_h) {
    if (img.pixels.empty() || crop_w <= 0 || crop_h <= 0) return {0, 0, {}};
    
    Image out;
    out.width = crop_w;
    out.height = crop_h;
    // Pre-allocate and initialize with black (0,0,0) for zero-padding out-of-bounds coordinates
    out.pixels.resize(crop_w * crop_h, {0.0f, 0.0f, 0.0f});

    int w = img.width, h = img.height;

    for (int y = 0; y < crop_h; ++y) {
        int src_y = start_y + y;
        if (src_y < 0 || src_y >= h) continue; // Out of bounds vertically -> remains zero-padded

        int out_row_offset = y * crop_w;
        int src_row_offset = src_y * w;

        for (int x = 0; x < crop_w; ++x) {
            int src_x = start_x + x;
            if (src_x < 0 || src_x >= w) continue; // Out of bounds horizontally -> remains zero-padded
            
            out.pixels[out_row_offset + x] = img.pixels[src_row_offset + src_x];
        }
    }
    return out;
}



void MeanBlur(std::string in, std::string out, int k) { save_image(mean_blur(load_image(in), k), out); }
void GaussianBlur(std::string in, std::string out, int k) { save_image(gaussian_blur(load_image(in), k), out); }
void Exposure(std::string in, std::string out, float f) { save_image(exposure(load_image(in), f), out); }
void Contrast(std::string in, std::string out, float f) { save_image(contrast(load_image(in), f), out); }
void Saturation(std::string in, std::string out, float f) { save_image(saturation(load_image(in), f), out); }

void HistogramEqualization(std::string in, std::string out) { save_image(histogram_equalization(load_image(in)), out); }
void Laplacian(std::string in, std::string out) { save_image(laplacian(load_image(in)), out); }
void Sharpening(std::string in, std::string out) { save_image(sharpening(load_image(in)), out); }
void GaussianNoise(std::string in, std::string out, float mean, float stddev) { save_image(gaussian_noise(load_image(in), mean, stddev), out); }
void SaltAndPepper(std::string in, std::string out, float prob) { save_image(salt_and_pepper(load_image(in), prob), out); }
void CannyEdge(std::string in, std::string out, float low, float high) { save_image(canny_edge_detection(load_image(in), low, high), out); }

void FlipHorizontal(std::string in, std::string out) { save_image(flip_horizontal(load_image(in)), out); }
void FlipVertical(std::string in, std::string out) { save_image(flip_vertical(load_image(in)), out); }
void Crop(std::string in, std::string out, int x, int y, int w, int h) { save_image(crop(load_image(in), x, y, w, h), out); }

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::function("MeanBlur", &MeanBlur);
    emscripten::function("GaussianBlur", &GaussianBlur);
    emscripten::function("Exposure", &Exposure);
    emscripten::function("Contrast", &Contrast);
    emscripten::function("Saturation", &Saturation);
    emscripten::function("HistogramEqualization", &HistogramEqualization);
    emscripten::function("Laplacian", &Laplacian);
    emscripten::function("Sharpening", &Sharpening);
    emscripten::function("GaussianNoise", &GaussianNoise);
    emscripten::function("SaltAndPepper", &SaltAndPepper);
    emscripten::function("CannyEdge", &CannyEdge);
    emscripten::function("FlipHorizontal", &FlipHorizontal);
    emscripten::function("FlipVertical", &FlipVertical);
    emscripten::function("Crop", &Crop);
}
/*
compiled using 
emcc modules_cpp/module.cpp -o modules_js/module.js \
  -O3 \
  -flto \
  -msimd128 \
  -s WASM=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s FORCE_FILESYSTEM=1 \
  -s MODULARIZE=1 \
  -s EXPORT_NAME="createModule" \
  -s "EXPORTED_RUNTIME_METHODS=['FS']" \
  --bind \
  -I.
*/