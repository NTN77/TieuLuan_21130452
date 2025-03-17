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

}

