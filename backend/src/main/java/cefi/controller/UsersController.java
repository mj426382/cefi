package cefi.controller;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cefi.bean.BeanValidator;
import cefi.model.User;
import cefi.service.UsersService;

@RestController
@RequestMapping("user")
public class UsersController {

	@Autowired
	private UsersService usersService;

	@Autowired
	private BeanValidator beanValidator;

	Logger logger = LoggerFactory.getLogger(UsersController.class);

	@PostMapping("")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		logger.info("Post /user");
		ArrayList<String> errorList = beanValidator.userValidate(user);
		if (errorList.size() != 0) {
			return new ResponseEntity<>(errorList, HttpStatus.BAD_REQUEST);
		}
		User existedUser = usersService.isDataExist(user);
		if (existedUser == null) {
			return new ResponseEntity<>(usersService.createUser(user), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("User already exist", HttpStatus.ALREADY_REPORTED);
		}
	}

	@GetMapping("")
	public ResponseEntity<?> allUsers() {
		logger.info("get /user");
		return new ResponseEntity<>(usersService.getAllUsers(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
		logger.info("get /user/" + id);
		return new ResponseEntity<>(usersService.getUserById(id), HttpStatus.OK);
	}

	@PutMapping("")
	public ResponseEntity<?> updateUser(@RequestBody User reqData) {
		logger.info("put /user");
		User existedUser = usersService.isDataExist(reqData);
		if (existedUser != null) {
			return new ResponseEntity<>(usersService.updateUser(reqData, existedUser), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Record not exist", HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUserById(@PathVariable("id") Long id) {
		logger.info("delete /user/" + id);
		return new ResponseEntity<>(usersService.deleteUserById(id), HttpStatus.OK);
	}

}
