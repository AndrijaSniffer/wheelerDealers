package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.AuthUser;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface IAuthUserService {
    List<AuthUser> getAllAuthUsers();
    boolean createOrUpdateAuthUser(AuthUser user);
    AuthUser getAuthUserById(Integer id);
    void deleteAuthUser(Integer id);
    UserDetails findByUsername(String username);
    Boolean existsByUsername(String username);
}
