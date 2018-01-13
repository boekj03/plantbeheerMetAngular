package nl.boksebeld.hibernate;

import java.util.List;

import javax.ejb.LocalBean;

import nl.boksebeld.domein.User;

@LocalBean
public interface UserDAO {
	
	Boolean saveUser(User user);
	
	User getUserByUsername (String username);
	
	List<User> getUsers();
	
	User updateUser(User u);
	
	void deleteUser(User u);
}