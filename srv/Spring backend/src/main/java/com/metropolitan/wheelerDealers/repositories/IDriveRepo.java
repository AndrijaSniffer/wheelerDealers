package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.entities.Drive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDriveRepo extends JpaRepository<Drive, Integer> {
}
