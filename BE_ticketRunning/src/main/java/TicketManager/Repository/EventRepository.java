package TicketManager.Repository;

import TicketManager.DTO.Reponse.EventReponse;
import TicketManager.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
    Optional<Event> findEventById(UUID id);
    Optional<Event> findEventByName(String name);
    boolean existsEventByName(String name);
    List<Event> findTop6ByOrderByEventDateAsc(); //lấy top 6 sự kiện gần nhất
    @Query("SELECT e.name, e.avatar, e.location, e.eventDate, e.description, e.total, " +
            "COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            " WHERE ep.event.id = e.id " +
            " AND ep.dateStart <= :currentDate " +
            " AND ep.dateFinish >= :currentDate), 0) " +
            "FROM Event e WHERE e.status = true")
    List<Object[]> findAllEventsWithMinPrice(@Param("currentDate") LocalDate currentDate);
//Top 6 giải gần nhất
@Query("SELECT e.name AS name, e.avatar AS avatar, e.location AS location, " +
        "e.eventDate AS eventDate, e.description AS description, e.total AS total, " +
        "COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
        " WHERE ep.event.id = e.id " +
        " AND ep.dateStart <= :currentDate " +
        " AND ep.dateFinish >= :currentDate), 0) AS minPrice " +
        "FROM Event e WHERE e.status = true " +
        "ORDER BY e.eventDate ASC")
    List<Object[]> findTop6Event(@Param("currentDate") LocalDate currentDate);
}
