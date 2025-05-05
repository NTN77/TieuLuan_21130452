package TicketManager.Repository;

import TicketManager.Entity.PriceEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface PriceEventRepostitory extends JpaRepository<PriceEvent, UUID> {
//Lấy ra các giai đoạn và các vé theo id trong thời gian bán
    @Query("SELECT p FROM PriceEvent p WHERE p.event.id = :idEvent AND p.dateStart <= :currentDate AND p.dateFinish >= :currentDate" )
    List<PriceEvent> getPriceEventByIdAndCurrentDate(@Param("idEvent") UUID idEvent , @Param("currentDate") LocalDate currentDate);

    //Lấy tất cả các giai đoạn cho admin
    List<PriceEvent> findPriceEventsByEvent_Id(UUID event_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM PriceEvent pe WHERE pe.event.id = :idEvent")
    int deleteByEventId(@Param("idEvent") UUID idEvent);
}
