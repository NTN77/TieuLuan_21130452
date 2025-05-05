package TicketManager.Repository;

import TicketManager.Entity.EventDetail;
import TicketManager.Entity.PriceEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface EvenntDetailRepository extends JpaRepository<EventDetail, UUID> {
    List<EventDetail> findEventDetailByEvent_Id(UUID eventId);
    Optional<EventDetail> findByEventIdAndNameImage(UUID eventId, String nameImage);

    @Modifying
    @Transactional
    @Query("DELETE FROM EventDetail ed WHERE ed.event.id = :idEvent AND ed.nameImage =:nameED")
    void deleteByEventIdAAndNameImage(@Param("idEvent") UUID idEvent , @Param("nameED") String nameED);

    @Query("SELECT ed FROM EventDetail ed WHERE  ed.event.id =:idEvent AND ed.nameImage =:nameED " )
    EventDetail findEventDetailByEvent_IdAndAndNameImage( @Param("idEvent") UUID idEvent , @Param("nameED") String nameED);
}

