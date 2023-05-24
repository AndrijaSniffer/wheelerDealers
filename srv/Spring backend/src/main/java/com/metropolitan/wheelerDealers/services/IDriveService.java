package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Drive;

import java.util.List;

public interface IDriveService {
    List<Drive> getAllDrives();
    boolean createOrUpdateDrive(Drive drive);
    Drive getDriveById(Integer id);
    void deleteDrive(Integer id);
}
