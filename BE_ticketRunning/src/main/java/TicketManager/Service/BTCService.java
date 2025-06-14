package TicketManager.Service;

import TicketManager.DTO.Request.BTCRequest;
import TicketManager.DTO.Request.EventRequest;
import TicketManager.Entity.BTC;
import TicketManager.Entity.Event;
import TicketManager.Enum.ErrorCode;
import TicketManager.Exception.AppException;
import TicketManager.Repository.BTCRepository;
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BTCService {
    final BTCRepository btcRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    public BTC createEvent(MultipartFile file, BTCRequest btc) throws IOException {
        // Kiểm tra nếu sự kiện đã tồn tại theo tên
        if (btcRepository.existsBTCByName(btc.getName())) {
            throw new AppException(ErrorCode.NAME_BTC_EXIST);
        }
        BTC btc1 = new BTC();
        btc1.setName(btc.getName());
        btc1.setStatus(true);
        btcRepository.save(btc1);
        String imageUrl = cloudinaryService.uploadImage(file.getBytes(), btc1.getId(), btc1.getName());
        btc1.setUrlImage(imageUrl);
        return btcRepository.save(btc1);
    }
    public List<BTC> getAll(){
        return btcRepository.getAll();
    }

    public boolean updateStatus(UUID id,boolean status) {
        return btcRepository.updateStatus(id,status) > 0;
    }
    public boolean updateBTC(UUID id , String name , String urlImage){
        return btcRepository.updateBTC(name,urlImage,id) > 0;
    }
    public boolean updateBTCNoAvatar(UUID id ,String name){
        return btcRepository.updateBTC(name,id) > 0;
    }
}
