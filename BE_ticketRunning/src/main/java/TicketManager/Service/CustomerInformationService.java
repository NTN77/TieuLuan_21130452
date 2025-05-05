package TicketManager.Service;

import TicketManager.DTO.Reponse.CustomerInformationReponse;
import TicketManager.DTO.Reponse.CustomerSignInReponse;
import TicketManager.DTO.Reponse.DataMonth;
import TicketManager.DTO.Reponse.RevenueByMonth;
import TicketManager.DTO.Request.CustomerInformationRequest;
import TicketManager.DTO.Request.CustomerSignInRequest;
import TicketManager.Entity.CustomerInformation;
import TicketManager.Entity.Event;
import TicketManager.Repository.CustomerInformationRepo;
import TicketManager.Repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class CustomerInformationService {
    private final CustomerInformationRepo customerInformationRepo;
    private final EventRepository eventRepository;

    public CustomerInformation findById(UUID id) {
        return customerInformationRepo.findCustomerInformationById(id);
    }

    public CustomerInformation save(CustomerInformationRequest request) {
        try {
            CustomerInformation c = new CustomerInformation();
            c.setEmail(request.getEmail());
            c.setUserName(request.getUserName());
            c.setIdentityCard(request.getIdentityCard()); //
            c.setBirthDate(request.getBirthDate());
            c.setGender(request.isGender());
            c.setCreateAt(Timestamp.from(Instant.now()));
            c.setCountry(request.getCountry()); //
            c.setNationality(request.getNationality()); //
            c.setPhoneNumber(request.getPhoneNumber());
            c.setProvince(request.getProvince());
            c.setStatus(false);
            c.setSizeChart(request.getSizeChart());
            c.setUserNameKC(request.getUserNameKC());
            c.setPhoneNumberKC(request.getPhoneNumberKC());
            c.setBloodGroup(request.getBloodGroup());
            c.setHealthCare(request.getHealthCare());
            UUID idUser = UUID.fromString(String.valueOf(request.getIdUser()));
            c.setIdUser(idUser);
            c.setEventDistance(request.getEventDistance());
            UUID idEvent = UUID.fromString(String.valueOf(request.getEventId()));
            c.setEventId(idEvent);
            c.setEventPrice(request.getEventPrice());
            return customerInformationRepo.save(c);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lưu thông tin khách hàng: " + e.getMessage());
        }
    }

    @Transactional
    public void setStatus(UUID id) {
        customerInformationRepo.updateStatus(id, true);
    }

    //Lấy ra danh sách các giải mà user đăng ký
    public List<CustomerInformationReponse> listAllSignIn(UUID idUser) {
        List<CustomerInformation> c = customerInformationRepo.findCustomerInformationAll(idUser);
        List<CustomerInformationReponse> result = new ArrayList<>();
        for (CustomerInformation ci : c) {
            CustomerInformationReponse ciReponse = new CustomerInformationReponse();
            ciReponse.setEmail(ci.getEmail());
            ciReponse.setId(ci.getId());
            ciReponse.setUserName(ci.getUserName());
            ciReponse.setPhoneNumber(ci.getPhoneNumber());
            ciReponse.setNationality(ci.getNationality());
            ciReponse.setCountry(ci.getCountry());
            ciReponse.setProvince(ci.getProvince());
            ciReponse.setSizeChart(ci.getSizeChart());
            ciReponse.setUserNameKC(ci.getUserNameKC());
            ciReponse.setPhoneNumberKC(ci.getPhoneNumberKC());
            ciReponse.setBloodGroup(ci.getBloodGroup());
            ciReponse.setHealthCare(ci.getHealthCare());
            ciReponse.setIdentityCard(ci.getIdentityCard());
            ciReponse.setGender(ci.isGender());
            ciReponse.setBirthDate(ci.getBirthDate());
            ciReponse.setEventDistance(ci.getEventDistance());
            ciReponse.setEventPrice(ci.getEventPrice());
            Event e = eventRepository.findEventById(ci.getEventId()).orElseThrow();
            ciReponse.setStatus(ci.isStatus());
            ciReponse.setCreateAt(ci.getCreateAt());
            ciReponse.setEventName(e.getName());
            result.add(ciReponse);
        }
        return result;
    }

    //Lấy ra thống kê mua vé theo tháng
    public List<DataMonth> dataStatistics() {
        List<Object[]> data = customerInformationRepo.thongKeDangKyTheoThang();
        List<DataMonth> result = new ArrayList<>();
        for (Object[] row : data) {
            DataMonth re = new DataMonth();
            Integer thang = ((Number) row[0]).intValue();
            Integer number = ((Number) row[1]).intValue();

            re.setMonth(thang);
            re.setNumber(number);
            result.add(re);
        }
        return result;
    }
    //Lấy ra thống kê doanh thu theo tháng
    public List<RevenueByMonth> revenueByMonths() {
        List<Object[]> data = customerInformationRepo.thongKeDoanhThuTheoThang();
        List<RevenueByMonth> result = new ArrayList<>();
        for (Object[] row : data) {
            RevenueByMonth re = new RevenueByMonth();
            Integer thang = ((Number) row[0]).intValue();
            Double revenue = ((Number) row[1]).doubleValue();

            re.setMonth(thang);
            re.setTotalRevenue(revenue);
            result.add(re);
        }
        return result;
    }
    public int sumSignInOfEvent(UUID eventId){
        return customerInformationRepo.sumSignInOfEvent(eventId);
    }
    public int countConfirm(UUID eventId) {
        return customerInformationRepo.sumConfirm(eventId);
    }
    public List<CustomerSignInReponse> findCustomerInformationByEventId(UUID eventId){
        List<CustomerInformation> ci = customerInformationRepo.findCustomerInformationByEventId(eventId);
        List<CustomerSignInReponse> result = new ArrayList<>();
        for(CustomerInformation i : ci){
            CustomerSignInReponse cip = new CustomerSignInReponse();
            cip.setId(i.getId());
            cip.setUserName(i.getUserName());
            cip.setPhoneNumber(i.getPhoneNumber());
            cip.setNationality(i.getNationality());
            cip.setCountry(i.getCountry());
            cip.setProvince(i.getProvince());
            cip.setSizeChart(i.getSizeChart());
            cip.setUserNameKC(i.getUserNameKC());
            cip.setPhoneNumberKC(i.getPhoneNumberKC());
            cip.setBloodGroup(i.getBloodGroup());
            cip.setHealthCare(i.getHealthCare());
            cip.setEmail(i.getEmail());
            cip.setIdentityCard(i.getIdentityCard());
            cip.setGender(i.isGender());
            cip.setBirthDate(i.getBirthDate());
            cip.setEventDistance(i.getEventDistance());
            cip.setEventPrice(i.getEventPrice());
            cip.setStatus(i.isStatus());
            cip.setCreateAt(i.getCreateAt());
            cip.setBib(i.getBib());
            result.add(cip);
        }
        return result;
    }

    //Update bib cho người đăng ký
    public boolean updateBib(UUID idCustomer , String bib){
        return customerInformationRepo.updateBib(idCustomer,bib) > 0;
    }

    //In ra excel
    public List<CustomerInformation> printExcel(UUID idEvent){
        return customerInformationRepo.printExcel(idEvent);
    }

    //update thông tin
    public boolean editInformationSignIn(CustomerSignInRequest request){
        return customerInformationRepo.updateInformationSignIn(request.getIdUser(),request.getUserName(),request.getPhoneNumber(),request.getIdentityCard(),request.isGender(),request.getNationality(),
                request.getCountry(),request.getBirthDate(),request.getProvince(),
                request.getSizeChart(),request.getUserNameKC(),request.getPhoneNumberKC(),request.getBloodGroup(),request.getHealthCare()) > 0 ;
    }
}
