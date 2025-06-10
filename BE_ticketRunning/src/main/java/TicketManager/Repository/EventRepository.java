package TicketManager.Repository;

import TicketManager.DTO.Reponse.EventReponse;
import TicketManager.Entity.Event;
import org.springframework.data.domain.Pageable;
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
public interface EventRepository extends JpaRepository<Event, UUID> {
    Optional<Event> findEventById(UUID id);

    Optional<Event> findEventByName(String name);

    boolean existsEventByName(String name);


    @Query("SELECT e.id, e.name, e.avatar, e.location, e.eventDate, e.description, " +
            "COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            " WHERE ep.event.id = e.id " +
            " AND ep.dateStart <= :currentDate " +
            " AND ep.dateFinish >= :currentDate), 0) " +
            "FROM Event e WHERE e.status = true")
    List<Object[]> findAllEventsWithMinPrice(@Param("currentDate") LocalDate currentDate);
    @Query("SELECT e.id, e.name, e.avatar, e.location, e.eventDate, e.description, " +
            "COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            "          WHERE ep.event.id = e.id " +
            "          AND ep.dateStart <= :currentDate " +
            "          AND ep.dateFinish >= :currentDate), 0) AS minPrice " +
            "FROM Event e " +
            "WHERE e.status = true AND " +
            "      COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            "               WHERE ep.event.id = e.id " +
            "               AND ep.dateStart <= :currentDate " +
            "               AND ep.dateFinish >= :currentDate), 0) > 0 " +
            "ORDER BY e.eventDate ASC")

    List<Object[]> findTop9Event(@Param("currentDate") LocalDate currentDate);

    //Top 6 giải được bán nhiều nhất
    @Query("SELECT e.id, e.name, e.avatar, e.location, e.eventDate, e.description, " +
            "COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            "         WHERE ep.event.id = e.id " +
            "         AND ep.dateStart <= :currentDate " +
            "         AND ep.dateFinish >= :currentDate), 0) AS minPrice " +
            "FROM Event e " +
            "JOIN PriceEvent pe ON e.id = pe.event.id " +
            "WHERE e.status = true " +
            "GROUP BY e.id, e.name, e.avatar, e.location, e.eventDate, e.description " +
            "HAVING COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            "                WHERE ep.event.id = e.id " +
            "                AND ep.dateStart <= :currentDate " +
            "                AND ep.dateFinish >= :currentDate), 0) > 0")
    List<Object[]> findTop6EventsByTotalSold(@Param("currentDate") LocalDate currentDate, Pageable pageable);
    //Lấy ra kết quả tìm kiếm
    @Query(value = "SELECT e.id, e.name AS name, e.avatar AS avatar, e.location AS location, " +
            "e.eventDate AS eventDate, e.description AS description, " +
            "COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            " WHERE ep.event.id = e.id " +
            " AND ep.dateStart <= :currentDate " +
            " AND ep.dateFinish >= :currentDate), 0) AS minPrice " +
            "FROM Event e " +
            "WHERE (FUNCTION('MONTH', e.eventDate) = :month AND FUNCTION('YEAR', e.eventDate) = :year) " +
            "OR e.name LIKE %:name%")
    List<Object[]> findEventByEventDateOrNameContain(@Param("currentDate") LocalDate currentDate,
                                                     @Param("month") int month,
                                                     @Param("year") int year,
                                                     @Param("name") String name);
    @Query(value = "SELECT e.id, e.name AS name, e.avatar AS avatar, e.location AS location, " +
            "e.eventDate AS eventDate, e.description AS description, " +
            "COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            " WHERE ep.event.id = e.id " +
            " AND ep.dateStart <= :currentDate " +
            " AND ep.dateFinish >= :currentDate), 0) AS minPrice " +
            "FROM Event e " +
            "WHERE (FUNCTION('MONTH', e.eventDate) = :month AND FUNCTION('YEAR', e.eventDate) = :year)")
    List<Object[]> findEventByEventDate(@Param("currentDate") LocalDate currentDate,
                                                     @Param("month") int month,
                                                     @Param("year") int year);
    //filter lọc event
    @Query(value = "SELECT e.id, e.name AS name, e.avatar AS avatar, e.location AS location, " +
            "e.eventDate AS eventDate, e.description AS description, " +
            "COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            " WHERE ep.event.id = e.id " +
            " AND ep.dateStart <= :currentDate " +
            " AND ep.dateFinish >= :currentDate), 0) AS minPrice " +
            "FROM Event e " +
            "WHERE FUNCTION('MONTH', e.eventDate) = :month "+
            "AND COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            " WHERE ep.event.id = e.id " +
            " AND ep.dateStart <= :currentDate " +
            " AND ep.dateFinish >= :currentDate), 0) <= :priceFilter")
    List<Object[]> filterEvent(@Param("currentDate") LocalDate currentDate,
                                        @Param("month") int month,
                                        @Param("priceFilter") double priceFilter);
//filter 0 có tháng
    @Query(value = "SELECT e.id, e.name AS name, e.avatar AS avatar, e.location AS location, " +
            "e.eventDate AS eventDate, e.description AS description, " +
            "COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            " WHERE ep.event.id = e.id " +
            " AND ep.dateStart <= :currentDate " +
            " AND ep.dateFinish >= :currentDate), 0) AS minPrice " +
            "FROM Event e " +
            "WHERE COALESCE((SELECT MIN(ep.price) FROM PriceEvent ep " +
            " WHERE ep.event.id = e.id " +
            " AND ep.dateStart <= :currentDate " +
            " AND ep.dateFinish >= :currentDate), 0) <= :priceFilter")
    List<Object[]> filterEventPrice(@Param("currentDate") LocalDate currentDate,
                               @Param("priceFilter") double priceFilter);

    //Lấy ra số lượng giải sẽ tổ chức theo tháng
    @Query(value = "SELECT MONTH(c.event_date) AS thang, " +
            "SUM(CASE WHEN c.status = 1 THEN 1 ELSE 0 END) AS totalEvent " +
            "FROM event c " +
            "WHERE YEAR(c.event_date) = YEAR(CURDATE()) " +
            "GROUP BY MONTH(c.event_date) " +
            "ORDER BY thang",
            nativeQuery = true)
    List<Object[]> thongKeSKDienRaTheoThang();

    //Thay đổi trạng thái
    @Modifying
    @Query("UPDATE Event e SET e.status =:status WHERE e.id = :idEvent")
    int updateStatusEvent(@Param("idEvent") UUID idEvent,@Param("status") boolean status );
    //update sự kiện
    @Modifying
    @Transactional
    @Query("UPDATE Event e SET e.name =:name , e.avatar =:avatar , e.description =:description, e.eventDate =:eventDate,e.location =:location WHERE e.id = :idEvent")
    int updateEvent(@Param("name") String name,@Param("avatar") String avatar,@Param("description") String description ,@Param("eventDate") LocalDate eventDate,@Param("location") String location ,@Param("idEvent") UUID idEvent);

    @Modifying
    @Transactional
    @Query("UPDATE Event e SET e.name =:name , e.description =:description, e.eventDate =:eventDate,e.location =:location WHERE e.id = :idEvent")
    int updateEventNoAvatar(@Param("name") String name,@Param("description") String description ,@Param("eventDate") LocalDate eventDate,@Param("location") String location ,@Param("idEvent") UUID idEvent);
}

