package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.entities.Drive;
import com.metropolitan.wheelerDealers.services.IDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("drives")
public class DriveController {
    @Autowired
    private IDriveService driveService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<Drive>> getAllDrives(){
        List<Drive> countries = driveService.getAllDrives();

        return ResponseEntity.ok(countries);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<Drive> getDriveById(@PathVariable int id){
        Drive c = driveService.getDriveById(id);

        if(c.getId() != null){
            return ResponseEntity.ok(c);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> createDrive(@RequestBody Drive drive){
        if(driveService.createOrUpdateDrive(drive)){
            return ResponseEntity.ok("Created");
        }else{
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> updateDrive(@RequestBody Drive drive){
        if(drive.getId() != null) {
            if (driveService.createOrUpdateDrive(drive)) {
                return ResponseEntity.ok("Updated");
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else{
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> deleteDrive(@PathVariable Integer id){
        driveService.deleteDrive(id);
        return ResponseEntity.ok("Deleted");
    }
}
