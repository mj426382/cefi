package cefi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cefi.model.User;

public interface UsersRepository extends JpaRepository<User, Long> {

	User findByEmailAndPhoneNumber(String email, String phoneNumber);

	User findByEmailAndPhoneNumberAndName(String email, String phoneNumber, String name);

}
