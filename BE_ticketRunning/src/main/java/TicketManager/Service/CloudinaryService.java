package TicketManager.Service;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(byte[] fileBytes, UUID eventId, String imageCategory) throws IOException {
        String folderPath = "events/" + eventId.toString();  // Tạo folder theo eventId
        String publicId = folderPath + "/" + imageCategory;  // Đặt tên ảnh theo loại ảnh

        Map uploadResult = cloudinary.uploader().upload(fileBytes, ObjectUtils.asMap(
                "folder", folderPath,
                "public_id", publicId,
                "overwrite", true // Nếu đã có ảnh này thì cập nhật
        ));

        return uploadResult.get("secure_url").toString();  // Trả về URL ảnh
    }

    public boolean deleteImage(String imageUrl) {
        try {
            String publicId = extractPublicId(imageUrl);

            Map result = cloudinary.uploader().destroy(publicId, Map.of());

            // Kiểm tra kết quả trả về
            return "ok".equals(result.get("result"));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    private String extractPublicId(String imageUrl) {
        // Cắt chuỗi để lấy public_id
        String[] parts = imageUrl.split("/upload/");
        if (parts.length < 2) {
            throw new IllegalArgumentException("Invalid Cloudinary URL");
        }
        String pathPart = parts[1];
        pathPart = pathPart.replaceAll("^v\\d+/", ""); // Xóa version
        return pathPart.substring(0, pathPart.lastIndexOf('.')); // Xóa đuôi .jpg
    }
}

