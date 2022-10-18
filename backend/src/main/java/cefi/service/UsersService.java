package cefi.service;

import cefi.encryption.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cefi.model.User;
import cefi.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService {

	@Autowired
	private UsersRepository usersRepository;

	public User createUser(User user) {
		String salt = PasswordUtils.getSalt(256);
		String newPassword = PasswordUtils.generateSecurePassword(user.getPassword(), salt);
		user.setPassword(newPassword);
		return usersRepository.save(user);
	}

	public List<User> getAllUsers() {
		return usersRepository.findAll();
	}

	public User isDataExist(User user) {
		return usersRepository.findByEmailAndMobNo(user.getEmail(), user.getMobNo());
	}

	public Object getUserById(Long id) {
		return usersRepository.findById(id);
	}

	public User updateUser(User user, User newUser) {
		newUser.setName(user.getName());
		newUser.setEmail(user.getEmail());
		newUser.setMobNo(user.getMobNo());
		newUser.setPassword(user.getPassword());
		return usersRepository.save(newUser);
	}

	public Object deleteUserById(Long id) {
		usersRepository.deleteById(id);
		return null;
	}
}
