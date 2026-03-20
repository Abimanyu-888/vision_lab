#include <iostream>
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"
#include <cmath>
#include <algorithm>
#include <emscripten/bind.h>
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
std::vector<std::vector<RGB>> mean_blur(
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

std::vector<std::vector<RGB>> gaussian_blur(const std::vector<std::vector<RGB>>& img,int k){
    if(k%2==0 || k<2) return {};
    int n=img.size();
    if(!n) return {};
    int m=img[0].size();
    if(!m) return {};
    std::vector<std::vector<RGB>> out(n,std::vector<RGB>(m));
    std::vector<double> kernal(k/2+1);
    double sigma=std::max(0.5,k/6.0);
    kernal[0]=1;
    double normalize=1.0;
    for(int i=1;i<k/2+1;i++){
        double temp=(i*i)/(2*sigma*sigma);
        kernal[i]=std::exp(-temp);
        normalize+=kernal[i]*2;
    }
    for(int i=0;i<k/2+1;i++) kernal[i]/=normalize;
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            double sum_r=0.0,sum_g=0.0,sum_b=0.0;
            int r1=std::max(j-k/2,0);
            int r2=std::min(m,j+k/2+1);
            for(int x=r1;x<r2;x++){
                sum_r+=img[i][x].r*kernal[std::abs(x-j)];
                sum_g+=img[i][x].g*kernal[std::abs(x-j)];
                sum_b+=img[i][x].b*kernal[std::abs(x-j)];
            }
            out[i][j].r=sum_r;
            out[i][j].g=sum_g;
            out[i][j].b=sum_b;
        }
    }
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            double sum_r=0,sum_g=0,sum_b=0;
            int r1=std::max(i-k/2,0);
            int r2=std::min(n,i+k/2+1);
            for(int x=r1;x<r2;x++){
                sum_r+=out[x][j].r*kernal[std::abs(x-i)];
                sum_g+=out[x][j].g*kernal[std::abs(x-i)];
                sum_b+=out[x][j].b*kernal[std::abs(x-i)];
            }
            out[i][j].r=std::clamp(sum_r,0.0,255.0);
            out[i][j].g=std::clamp(sum_g,0.0,255.0);
            out[i][j].b=std::clamp(sum_b,0.0,255.0);

        }
    }
    return out;
}

std::vector<std::vector<RGB>> exposure(const std::vector<std::vector<RGB>>& img,double factor){
    std::vector<std::vector<RGB>> newimg(img.size(),std::vector<RGB>(img[0].size()));
    for(int i=0;i<img.size();i++){
        for(int j=0;j<img[0].size();j++){
            newimg[i][j].r=std::clamp(img[i][j].r*factor,0.0,255.0);
            newimg[i][j].g=std::clamp(img[i][j].g*factor,0.0,255.0);
            newimg[i][j].b=std::clamp(img[i][j].b*factor,0.0,255.0);
        }
    }
    return newimg;
}
std::vector<std::vector<RGB>> contrast(const std::vector<std::vector<RGB>>& img,double factor){
    std::vector<std::vector<RGB>> newimg(img.size(),std::vector<RGB>(img[0].size()));
    double anchor=128.0;
    for(int i=0;i<img.size();i++){
        for(int j=0;j<img[0].size();j++){
            newimg[i][j].r=std::clamp((img[i][j].r-anchor)*factor+anchor,0.0,255.0);
            newimg[i][j].g=std::clamp((img[i][j].g-anchor)*factor+anchor,0.0,255.0);
            newimg[i][j].b=std::clamp((img[i][j].b-anchor)*factor+anchor,0.0,255.0);
        }
    }
    return newimg;
}
std::vector<std::vector<RGB>> saturation(const std::vector<std::vector<RGB>>& img,double factor){
    std::vector<std::vector<RGB>> newimg(img.size(),std::vector<RGB>(img[0].size()));
    for(int i=0;i<img.size();i++){
        for(int j=0;j<img[0].size();j++){
            double grey=0.3086*img[i][j].r+0.6094*img[i][j].g+0.0820*img[i][j].b;
            newimg[i][j].r=std::clamp(grey+factor*(img[i][j].r-grey),0.0,255.0);
            newimg[i][j].g=std::clamp(grey+factor*(img[i][j].g-grey),0.0,255.0);
            newimg[i][j].b=std::clamp(grey+factor*(img[i][j].b-grey),0.0,255.0);
        }
    }
    return newimg;
}


void MeanBlur(std::string inputFilename,std::string outputFilename,int k){
    std::vector<std::vector<RGB>> img=load_into_vec_rgb(inputFilename);
    img=mean_blur(img,k);
    save_image_from_rgb_vec(img,outputFilename,100);
}
void Exposure(std::string inputFilename,std::string outputFilename,int k){
    std::vector<std::vector<RGB>> img=load_into_vec_rgb(inputFilename);
    img=exposure(img,k);
    save_image_from_rgb_vec(img,outputFilename,100);
}
void Contrast(std::string inputFilename,std::string outputFilename,int k){
    std::vector<std::vector<RGB>> img=load_into_vec_rgb(inputFilename);
    img=contrast(img,k);
    save_image_from_rgb_vec(img,outputFilename,100);
}
void Saturation(std::string inputFilename,std::string outputFilename,int k){
    std::vector<std::vector<RGB>> img=load_into_vec_rgb(inputFilename);
    img=saturation(img,k);
    save_image_from_rgb_vec(img,outputFilename,100);
}
void GaussianBlur(std::string inputFilename,std::string outputFilename,int k){
    std::vector<std::vector<RGB>> img=load_into_vec_rgb(inputFilename);
    img=gaussian_blur(img,k);
    save_image_from_rgb_vec(img,outputFilename,100);
}
EMSCRIPTEN_BINDINGS(my_module){
    emscripten::function("MeanBlur",&MeanBlur);
    emscripten::function("Exposure",&Exposure);
    emscripten::function("Contrast",&Contrast);
    emscripten::function("Saturation",&Saturation);
    emscripten::function("GaussianBlur",&GaussianBlur);

}