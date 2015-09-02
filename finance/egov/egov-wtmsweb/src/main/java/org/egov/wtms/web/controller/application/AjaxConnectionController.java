/**
 * eGov suite of products aim to improve the internal efficiency,transparency, accountability and the service delivery of the
 * government organizations.
 *
 * Copyright (C) <2015> eGovernments Foundation
 *
 * The updated version of eGov suite of products as by eGovernments Foundation is available at http://www.egovernments.org
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program. If not, see
 * http://www.gnu.org/licenses/ or http://www.gnu.org/licenses/gpl.html .
 *
 * In addition to the terms of the GPL license to be adhered to in using this program, the following additional terms are to be
 * complied with:
 *
 * 1) All versions of this program, verbatim or modified must carry this Legal Notice.
 *
 * 2) Any misrepresentation of the origin of the material is prohibited. It is required that all modified versions of this
 * material be marked in reasonable ways as different from the original version.
 *
 * 3) This license does not grant any rights to any user of the program with regards to rights under trademark law for use of the
 * trade names or trademarks of eGovernments Foundation.
 *
 * In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */
package org.egov.wtms.web.controller.application;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.egov.commons.Installment;
import org.egov.wtms.application.entity.WaterConnectionDetails;
import org.egov.wtms.application.service.ConnectionDemandService;
import org.egov.wtms.application.service.NewConnectionService;
import org.egov.wtms.application.service.WaterConnectionDetailsService;
import org.egov.wtms.masters.entity.ConnectionCategory;
import org.egov.wtms.masters.entity.PipeSize;
import org.egov.wtms.masters.entity.UsageType;
import org.egov.wtms.masters.service.UsageTypeService;
import org.egov.wtms.utils.constants.WaterTaxConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AjaxConnectionController {

    @Autowired
    private NewConnectionService newConnectionService;

    @Autowired
    private UsageTypeService usageTypeService;
    
    @Autowired
    private WaterConnectionDetailsService waterConnectionDetailsService;
    
    @Autowired
    private ConnectionDemandService connectionDemandService;

    @RequestMapping(value = "/ajaxconnection/check-primaryconnection-exists", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String isConnectionPresentForProperty(@RequestParam final String propertyID) {
        return newConnectionService.checkConnectionPresentForProperty(propertyID);
    }

    @RequestMapping(value = "/ajax-CategoryTypeByPropertyType", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<ConnectionCategory> getAllCategoryTypesByPropertyType(
            @RequestParam final Long propertyType) {
        List<ConnectionCategory> categoryTypes = new ArrayList<ConnectionCategory>(0);
        categoryTypes = usageTypeService.getAllCategoryTypesByPropertyType(propertyType);
        categoryTypes.forEach(categoryType -> categoryType.toString());
        return categoryTypes;
    }

    @RequestMapping(value = "/ajax-UsageTypeByPropertyType", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<UsageType> getAllUsageTypesByPropertyType(@RequestParam final Long propertyType) {
        List<UsageType> usageTypes = new ArrayList<UsageType>(0);
        usageTypes = usageTypeService.getAllUsageTypesByPropertyType(propertyType);
        usageTypes.forEach(usageType -> usageType.toString());
        return usageTypes;
    }

    @RequestMapping(value = "/ajax-PipeSizesByPropertyType", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<PipeSize> getAllPipeSizesByPropertyType(@RequestParam final Long propertyType) {
        List<PipeSize> pipesizes = new ArrayList<PipeSize>(0);
        pipesizes = usageTypeService.getAllPipeSizesByPropertyType(propertyType);
        pipesizes.forEach(pipesize -> pipesize.toString());
        return pipesizes;
    }
    @RequestMapping(value = "/ajax-meterReadingEntryExist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Boolean getMeterReadingEntryExist(
            @ModelAttribute("waterConnectionDetails") @RequestParam final Date givenDate, @RequestParam final String requestConsumerCode) {
        WaterConnectionDetails waterConnectionDetails = waterConnectionDetailsService.findByApplicationNumberOrConsumerCode(requestConsumerCode);
        Boolean enteredMonthReadingExist =  connectionDemandService.meterEntryAllReadyExistForCurrentMonth(waterConnectionDetails,givenDate);
        return enteredMonthReadingExist;
    }
   
}
