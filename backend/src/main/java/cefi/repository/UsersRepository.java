package cefi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cefi.model.User;

public interface UsersRepository extends JpaRepository<User, Long> {

	User findByEmailAndMobNo(String email, String mobNo);

}
