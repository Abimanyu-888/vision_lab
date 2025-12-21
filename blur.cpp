#include <iostream>
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"
#include <cmath>
#include <algorithm>
#include <emscripten/bind.h>
class image{
    struct RGB {
        double r;
        double g;
        double b;
    };
    std::vector<std::vector<RGB>> load_into_vec_rgb(const std::string filename){
        int width, height, channels;
        unsigned char* img_data = stbi_load(filename.c_str(), &width, &height, &channels, 3);

        if (img_data == NULL) {
            std::cerr << "Error loading image: " << stbi_failure_reason() << std::endl;
            return {};
        }

        std::cout << "Successfully loaded: " << filename << std::endl;
        std::cout << "Dimensions: " << width << " x " << height << std::endl;
        std::cout << "Channels: " << channels << std::endl;
        std::cout << "Total raw size: " << width * height * channels << " bytes" << std::endl;

        std::vector<std::vector<RGB>> img_vec(height, std::vector<RGB>(width));

        for (int h = 0; h < height; h++) {
            for (int w = 0; w < width; w++) {

                int idx = (h * width + w) * channels;

                img_vec[h][w].r = static_cast<double>(img_data[idx]);
                img_vec[h][w].g = static_cast<double>(img_data[idx + 1]);
                img_vec[h][w].b = static_cast<double>(img_data[idx + 2]);
            }
        }
        stbi_image_free(img_data);
        return img_vec;
    }
    void save_image_from_rgb_vec(
        const std::vector<std::vector<RGB>>& img_vec,
        const std::string filename,
        int quality = 90) {
        if (img_vec.empty() || img_vec[0].empty()) {
            std::cerr << "Error: Image vector is empty." << std::endl;
            return;
        }

        const int height = static_cast<int>(img_vec.size());
        const int width  = static_cast<int>(img_vec[0].size());
        const int channels = 3;

        std::vector<unsigned char> rgb_buffer(height * width * channels);

        for (int h = 0; h < height; ++h) {
            for (int w = 0; w < width; ++w) {
                const RGB& px = img_vec[h][w];

                // Round then clamp to integer 0..255, then cast to unsigned char
                int r = static_cast<int>(std::lround(px.r));
                int g = static_cast<int>(std::lround(px.g));
                int b = static_cast<int>(std::lround(px.b));

                r = std::clamp(r, 0, 255);
                g = std::clamp(g, 0, 255);
                b = std::clamp(b, 0, 255);

                int index = (h * width + w) * channels;
                rgb_buffer[index + 0] = static_cast<unsigned char>(r);
                rgb_buffer[index + 1] = static_cast<unsigned char>(g);
                rgb_buffer[index + 2] = static_cast<unsigned char>(b);
            }
        }

        int success = stbi_write_jpg(filename.c_str(), width, height, channels, rgb_buffer.data(), quality);

        if (success) {
            std::cout << "Saved image to " << filename << std::endl;
        } else {
            std::cerr << "Error: Failed to write JPEG file." << std::endl;
        }
    }
    std::vector<std::vector<RGB>> mean_blur_rgb(
        const std::vector<std::vector<RGB>>& img, int k)
    {
        int n = img.size();
        int m = img[0].size();
        std::vector<std::vector<RGB>> out(n, std::vector<RGB>(m));

        int r = k / 2;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {

                double sum_r = 0, sum_g = 0, sum_b = 0;
                int count = 0;

                int r1 = std::max(0, i - r);
                int r2 = std::min(n - 1, i + r);
                int c1 = std::max(0, j - r);
                int c2 = std::min(m - 1, j + r);

                for (int x = r1; x <= r2; x++) {
                    for (int y = c1; y <= c2; y++) {
                        sum_r += img[x][y].r;
                        sum_g += img[x][y].g;
                        sum_b += img[x][y].b;
                        count++;
                    }
                }

                out[i][j].r = sum_r / count;
                out[i][j].g = sum_g / count;
                out[i][j].b = sum_b / count;
            }
        }

        return out;
    }


    std::vector<std::vector<RGB>> image_vec;

public:
    image(const std::string inputfileName){
        image_vec=load_into_vec_rgb(inputfileName);
    }
    void apply_blur(int k){
        image_vec=mean_blur_rgb(image_vec,21);
    }
    void save(const std::string outputfileName){
        save_image_from_rgb_vec(image_vec,outputfileName);
    }
};
void image_blur(std::string inputFilename,std::string outputFilename,int k){
    image obj(inputFilename);
    obj.apply_blur(21);
    obj.save(outputFilename);
}
EMSCRIPTEN_BINDINGS(my_module){
    emscripten::function("image_blur",&image_blur);
}