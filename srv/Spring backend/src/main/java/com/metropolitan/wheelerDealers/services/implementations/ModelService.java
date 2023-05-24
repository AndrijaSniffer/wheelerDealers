package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.Model;
import com.metropolitan.wheelerDealers.repositories.IModelRepo;
import com.metropolitan.wheelerDealers.services.IModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModelService implements IModelService {
    @Autowired
    private IModelRepo modelRepo;

    @Override
    public List<Model> getAllModels() {
        return modelRepo.findAll();
    }

    @Override
    public boolean createOrUpdateModel(Model model) {
        return modelRepo.save(model).getId() != null;
    }

    @Override
    public Model getModelById(Integer id) {
        return modelRepo.findById(id).orElse(new Model());
    }

    @Override
    public void deleteModel(Integer id) {
        modelRepo.deleteById(id);
    }
}
