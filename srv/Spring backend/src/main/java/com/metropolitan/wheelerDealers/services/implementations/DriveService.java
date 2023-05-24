package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Drive;
import com.metropolitan.wheelerDealers.repositories.IDriveRepo;
import com.metropolitan.wheelerDealers.services.IDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriveService implements IDriveService {
    @Autowired
    private IDriveRepo driveRepo;

    @Override
    public List<Drive> getAllDrives() {
        return driveRepo.findAll();
    }

    @Override
    public boolean createOrUpdateDrive(Drive drive) {
        return driveRepo.save(drive).getId() != null;
    }

    @Override
    public Drive getDriveById(Integer id) {
        return driveRepo.findById(id).orElse(new Drive());
    }

    @Override
    public void deleteDrive(Integer id) {
        driveRepo.deleteById(id);
    }
}
