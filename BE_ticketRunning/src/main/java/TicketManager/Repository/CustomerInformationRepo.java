package TicketManager.Repository;

import TicketManager.Entity.CustomerInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface CustomerInformationRepo extends JpaRepository<CustomerInformation, UUID> {
    CustomerInformation findCustomerInformationById(UUID id);

    @Query("SELECT o FROM CustomerInformation  o WHERE o.eventId =:idEvent AND o.status = true")
    List<CustomerInformation> findCustomerInformationByEventId(@Param("idEvent") UUID eventId);

    //    Lấy ra danh sách khách hàng đăng ký theo giải nhưng đã xác thực để in ra excel
    @Query("SELECT o FROM CustomerInformation  o WHERE o.eventId =:idEvent AND o.status = true AND o.bib IS NOT NULL")
    List<CustomerInformation> printExcel(@Param("idEvent") UUID eventId);


    @Modifying
    @Query("UPDATE CustomerInformation o SET o.status = :status WHERE o.id = :idCI")
    void updateStatus(@Param("idCI") UUID idCI, @Param("status") boolean status);

    @Query("SELECT o FROM CustomerInformation  o WHERE o.idUser =:idUser AND o.status = true")
    List<CustomerInformation> findCustomerInformationAll(@Param("idUser") UUID idUser);

    //Lấy ra tháng và số lượng
    @Query(value = "SELECT MONTH(c.create_at) AS thang, " +
            "SUM(CASE WHEN c.status = 1 THEN 1 ELSE 0 END) AS soLuongThanhCong " +
            "FROM customer_information c " +
            "WHERE YEAR(c.create_at) = YEAR(CURDATE()) " +
            "GROUP BY MONTH(c.create_at) " +
            "ORDER BY thang",
            nativeQuery = true)
    List<Object[]> thongKeDangKyTheoThang();

    //Lấy ra doanh thu theo tháng
    @Query(value = "SELECT MONTH(c.create_at) AS thang, " +
            "SUM(CASE WHEN c.status = 1 THEN c.event_price ELSE 0 END) AS soLuongThanhCong " +
            "FROM customer_information c " +
            "WHERE YEAR(c.create_at) = YEAR(CURDATE())" +
            "GROUP BY MONTH(c.create_at) " +
            "ORDER BY thang",
            nativeQuery = true)
    List<Object[]> thongKeDoanhThuTheoThang();

    //Lấy ra tổng số người đăng ký giải theo id của giải
    @Query(value = "SELECT COUNT(c.eventId) FROM CustomerInformation c WHERE c.eventId =:eventId AND c.status = true ")
    public int sumSignInOfEvent(@Param("eventId") UUID eventId);

    //Lấy ra tổng số người đăng ký giải theo id của giải
    @Query(value = "SELECT COUNT(c) FROM CustomerInformation c WHERE c.eventId =:eventId AND c.status = true AND c.bib IS NULL ")
    public int sumConfirm(@Param("eventId") UUID eventId);

    //Cập nhật bib sau khi gửi thông tin
    @Transactional
    @Modifying
    @Query("UPDATE CustomerInformation o SET o.bib = :bib WHERE o.id = :idCI")
    int updateBib(@Param("idCI") UUID idCI, @Param("bib") String bib);
//Chỉnh Sửa thông tin đăng ký
    @Transactional
    @Modifying
    @Query("UPDATE CustomerInformation o SET o.userName =:name ,o.phoneNumber =:phoneNumber," +
            "                                o.identityCard =:identityCard,o.gender =:gender," +
            "                                o.nationality =:nationality,o.country=:country," +
            "                                o.birthDate =:birthDate,o.province =:province," +
            "                                o.sizeChart =:sizeChart,o.userNameKC =:userNameKC," +
            "                                o.phoneNumberKC =:phoneNumberKC,o.bloodGroup =:bloodGroup," +
            "                                o.healthCare =:healthCare  WHERE o.id = :idCI")
    int updateInformationSignIn(@Param("idCI") UUID idCI, @Param("name") String userName, @Param("phoneNumber") String phoneNumber,
                                @Param("identityCard") String identityCard , @Param("gender") boolean gender,
                                @Param("nationality") String nationality , @Param("country") String country,
                                @Param("birthDate") LocalDate birthDate , @Param("province") String province,
                                @Param("sizeChart") String sizeChart , @Param("userNameKC") String userNameKC,
                                @Param("phoneNumberKC") String phoneNumberKC , @Param("bloodGroup") String bloodGroup,
                                @Param("healthCare") String healthCare );

}
