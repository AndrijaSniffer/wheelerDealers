package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.DTO.SearchDTO;
import com.metropolitan.wheelerDealers.DTO.SearchResultDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Repository
public class SearchRepo implements ISearchRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SearchResultDTO> defaultSearch() {
        StringBuilder sql = new StringBuilder("SELECT DISTINCT `id_car`, `id_user`, `price`, c.`color`, `chassie_number`, `is_preowned`, `created_at`, c.`id_fuel`, `fuel_name`, `kml`, c.`id_model`, `name_model`, `year_of_manufacture`, mo.`id_manufacturer`, `name_manufacturer` " +
                "FROM `car` c, `fuel` f, `model` mo, `manufacturer` ma, `transmission` t, `drive` d, `engine` e, `interior` i " +
                "WHERE c.id_fuel = f.id_fuel and c.id_model = mo.id_model and mo.id_manufacturer = ma.id_manufacturer;");

        Query query = entityManager.createNativeQuery(sql.toString());

        return mapToSearchDTOList(query.getResultList());
    }

    @Override
    public List<SearchResultDTO> search(SearchDTO searchDTO) {

        StringBuilder sql = new StringBuilder("SELECT DISTINCT `id_car`, `id_user`, `price`, c.`color`, `chassie_number`, `is_preowned`, `created_at`, c.`id_fuel`, `fuel_name`, `kml`, c.`id_model`, `name_model`, `year_of_manufacture`, mo.`id_manufacturer`, `name_manufacturer` " +
                "FROM `car` c, `fuel` f, `model` mo, `manufacturer` ma, `transmission` t, `drive` d, `engine` e, `interior` i " +
                "WHERE c.id_fuel = f.id_fuel and c.id_model = mo.id_model and mo.id_manufacturer = ma.id_manufacturer");

        //region Basic parameters SQL
        if (searchDTO.getIdManufacturer() != null)
            sql.append(" and ma.id_manufacturer = ").append(searchDTO.getIdManufacturer());

        if (searchDTO.getIdModel() != null)
            sql.append(" and mo.id_model = ").append(searchDTO.getIdModel());

        if (searchDTO.getIdTransmission() != null)
            sql.append(" and t.id_transmission = ").append(searchDTO.getIdTransmission());

        if (searchDTO.getIdFuel() != null)
            sql.append(" and f.id_fuel = ").append(searchDTO.getIdFuel());

        if (searchDTO.getIdDrive() != null)
            sql.append(" and d.id_drive = ").append(searchDTO.getIdDrive());

        if (searchDTO.getVolume() != null)
            sql.append(" and d.id_drive = ").append(searchDTO.getVolume());

        if (searchDTO.getCarColor() != null)
            sql.append(" and c.color = ").append(searchDTO.getCarColor());

        if (searchDTO.getLeftSideSteeringWheel() != null)
            sql.append(" and i.left_side_steering_wheel = ").append(searchDTO.getLeftSideSteeringWheel());
        //endregion

        //region Price parameter SQL
        if (searchDTO.getPriceFrom() != null && searchDTO.getPriceTo() != null)
            sql.append(" and c.price is between ").append(searchDTO.getPriceFrom()).append(" and ").append(searchDTO.getPriceTo());
        else if (searchDTO.getPriceFrom() != null)
            sql.append(" and c.price > ").append(searchDTO.getPriceFrom());
        else if (searchDTO.getPriceTo() != null)
            sql.append(" and c.price < ").append(searchDTO.getPriceTo());
        //endregion

        //region Horsepower parameter SQL
        if (searchDTO.getHpFrom() != null && searchDTO.getHpTo() != null)
            sql.append(" and e.horsepower is between ").append(searchDTO.getHpFrom()).append(" and ").append(searchDTO.getHpTo());
        else if (searchDTO.getHpFrom() != null)
            sql.append(" and e.horsepower > ").append(searchDTO.getHpFrom());
        else if (searchDTO.getHpTo() != null)
            sql.append(" and e.horsepower < ").append(searchDTO.getHpTo());
        //endregion

        //region Kilowatt parameter SQL
        if (searchDTO.getKwFrom() != null && searchDTO.getKwTo() != null)
            sql.append(" and e.kilowatt is between ").append(searchDTO.getKwFrom()).append(" and ").append(searchDTO.getKwTo());
        else if (searchDTO.getKwFrom() != null)
            sql.append(" and e.kilowatt > ").append(searchDTO.getKwFrom());
        else if (searchDTO.getKwTo() != null)
            sql.append(" and e.kilowatt < ").append(searchDTO.getKwTo());
        //endregion

        Query query = entityManager.createNativeQuery(sql.toString());

        return mapToSearchDTOList(query.getResultList());
    }

    private List<SearchResultDTO> mapToSearchDTOList(List<Object[]> rows){
        List<SearchResultDTO> result = new ArrayList<>(rows.size());

        for (Object[] row : rows) {
            result.add(new SearchResultDTO(
                    (Integer) row[0],
                    (Integer) row[1],
                    ((BigDecimal) row[2]).intValue(),
                    (String) row[3],
                    (String) row[4],
                    (Boolean) row[5],
                    ((Timestamp) row[6]).toInstant(),
                    (Integer) row[7],
                    (String) row[8],
                    (Integer) row[9],
                    (Integer) row[10],
                    (String) row[11],
                    (Integer) row[12],
                    (Integer) row[13],
                    (String) row[14]
            ));
        }

        return result;
    }
}
