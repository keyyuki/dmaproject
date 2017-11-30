# dmaproject

## Stock Predict

## Author: Nguyễn Ngọc Kiên

Chương trình dự đoán chứng khoán dựa trên lịch sử biến động giá 

Yêu cầu môi trường cần cài đặt:
- nodejs > 7.0
- jdk > 7
- weka > 3.8, có cài package timeserialForecasting

## Cách setup

clone git
```
git clone https://github.com/keyyuki/dmaproject.git
```

```
cd dmaproject
```
install lib
```
npm install --save
```
run
```
node index.js
```
Mở trình duyệt theo đường dẫn http://localhost:3000/

### Cách lấy dữ liệu

Vào đường dẫn https://liveprice.fpts.com.vn

chọn 1 mã chứng khoán bất kì, chuột phải, chọn "Lịch sử giá"

Tại trang Lịch sử giá, chọn khung thời gian bạn muốn bấm nút Excel để download dữ liệu dưới dạng Excel về

Với file Excel vừa lấy, chuyển sang dạng CSV, chú ý format ở đây là theo chuẩn US, tức là dấu tách cột là , dấu thập phân là .

VD:
```
24/11/2017,VCB,47.9,51.2,44.55,47.5,47.4,47.7,47,47.26,-0.5,-1.04,"1,363,450","281,000","1,644,450","64,443","13,101","77,544"
```

Upload file csv lên form upload của chương trình, bấm submit, hệ thống sẽ tự in ra số liệu dự đoán trong 3 ngày tiếp theo

