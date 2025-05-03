package TicketManager.Service;

import TicketManager.Entity.Event;
import TicketManager.Entity.EventDetail;
import TicketManager.Enum.ErrorCode;
import TicketManager.Exception.AppException;
import TicketManager.Repository.EvenntDetailRepository;
import TicketManager.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventDetailService {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private EvenntDetailRepository eventDetailRepository;

    @Autowired
    private EventRepository eventRepository;

    public EventDetail createEventDetail(UUID eventId, MultipartFile file, String imageCategory) throws IOException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        String fileName = file.getOriginalFilename();

        // Kiểm tra nếu ảnh này đã tồn tại cho sự kiện
        Optional<EventDetail> existingImage = eventDetailRepository.findByEventIdAndNameImage(eventId, imageCategory);

        // Upload ảnh lên Cloudinary vào folder `events/{eventId}`
        String imageUrl = cloudinaryService.uploadImage(file.getBytes(), eventId, imageCategory);

        if (existingImage.isPresent()) {
            EventDetail image = existingImage.get();
            image.setUrl(imageUrl);
            return eventDetailRepository.save(image);
        } else {
            EventDetail newImage = new EventDetail();
            newImage.setEvent(event);
            newImage.setNameImage(imageCategory); // Lưu loại ảnh làm tên
            newImage.setUrl(imageUrl);
            return eventDetailRepository.save(newImage);
        }
    }

    public List<EventDetail> eventDetailsByEventId(UUID idEvent){
        return eventDetailRepository.findEventDetailByEvent_Id(idEvent);
    }

    //xóa các event detail cũ
    public void DeleteEventDetail(String nameED, UUID idEvent){
        EventDetail ed = eventDetailRepository.findEventDetailByEvent_IdAndAndNameImage(idEvent,nameED);
        boolean deleteImage = cloudinaryService.deleteImage(ed.getUrl());
        if(deleteImage){
            eventDetailRepository.deleteByEventIdAAndNameImage(idEvent,nameED);
        }else {
            throw new AppException(ErrorCode.DELETE_EVENT_FAILED);
        }
    }
}

