import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
// import { checkForNA } from "../utils";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  SubmitBar,
  SearchForm,
  Dropdown,
  SearchField,
  Table,
  Header,
  Toast,
  Loader,
} from "@upyog/digit-ui-react-components";

/**
 * Description: CMSearchCertificate component renders a form having certificate type, certificate number and a captcha for verification and display's a table as a result
 * @author: Khalid Rashid

 * @date: 2021-04-15
 * Recaptcha library used for captcha
 * @github: https://github.com/google-reCAPTCHA/recaptcha-v2
 * npm command: npm install react-google-recaptcha --save
*/

const CMSearchCertificate = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const [showToast, setShowToast] = useState(null);

  const isMobile = window.Digit.Utils.browser.isMobile();
  const todaydate = new Date();
  const today = todaydate.toISOString().split("T")[0];

  const [token, setToken] = useState("");
  const [ishuman, setIshuman] = useState(false);
  const [istable, setistable] = useState(false);
  const [certificate_name, setCertificate_name] = useState("");
  const [certificate_No, setCertificate_No] = useState("");


  // function to reset captcha
  const resetCaptcha = () => {
    grecaptcha.reset()
  };

  function setcertificate_No(e) {
    setCertificate_No(e.target.value);
  }

  function handleCaptchaChange(value) {
    setToken(value);
  }

  // Initialized form handling using the useForm hook from React Hook Form, setting default values for pagination, sorting, and date range filters.
  const { register, control, handleSubmit, setValue, getValues, reset, formState } = useForm({
    defaultValues: {
      offset: 0,
      limit: !isMobile && 10,
      sortBy: "commencementDate",
      sortOrder: "DESC",
    },
  });

  // sets ishuman to be true based on token
  useEffect(() => {
    if (token) {
      setIshuman(true);
    }
  }, [token]);

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    register("sortBy", "commencementDate");
    register("sortOrder", "DESC");
  }, [register, setValue, today]);

  // Calling hook to fetch commonmodule data
  const { isLoading, data } = Digit.Hooks.cm.useCMSearch({
    tenantId,
    filters: { 
      moduleName: certificate_name.code, 
      applicationNumber: certificate_No 
    },
  });
  const applicationData = data?.CommonDetail;

  // columns defined to be passed in applicationtable
  const columns = [
    { Header: t("CITIZEN_NAME"), accessor: "name" },
    { Header: t("CITIZEN_ADDRESS"), accessor: "address" },
    { Header: t("CERTIFICATE_NUMBER"), accessor: "certificateNumber" },
    { Header: t("ISSUE_DATE"), accessor: "issueDate" },
    { Header: t("VALID_UPTO"), accessor: "validUpto" },
    { Header: t("CERTIFICATE_STATUS"), accessor: "certificateStatus" },
  ];

  // defined a state to handle data object
  const [updatedData, setUpdatedData] = useState([
    {
      name: "",
      address: "",
      certificateNumber: "",
      issueDate: "",
      validUpto: "",
      certificateStatus: "",
    },
  ]);

  // certificates to be passed in the dropdown to select a particular certificate and their crtNo for the switch case in onsubmit function
  const certificateTypes = [
    {
      code: "advertisement",
      i18nKey: "Advertisement",
    },
    {
      code: "bpa",
      i18nKey: "Building Plan Approval",
    },
    {
      code: "community-hall",
      i18nKey: "Community Hall Booking",
    },
    {
      code: "deslugging",
      i18nKey: "Deslugging Service",
    },
    {
      code: "e-waste",
      i18nKey: "E-Waste Certificate"
    },
    {
      code: "fire-NOC",
      i18nKey: "Fire NOC Certificate"
    },
    {
      code: "pet",
      i18nKey: "Pet Certificate"
    },
    {
      code: "public-grievance",
      i18nKey: "Public Grievance Redressal"
    },
    {
      code: "property-tax",
      i18nKey: "Property Tax"
    },
    {
      code: "water&sewerage",
      i18nKey: "Wate and Sewerage Certificate"
    },
    {
      code: "street-vending",
      i18nKey: "Street Vending"
    },
    {
      code: "trade-license",
      i18nKey: "Trade License"
    },
  ];

  function onSubmit() {
    if (applicationData?.applicationNumber) {
      setUpdatedData([
        {
          name: applicationData?.name || "NA",
          address: applicationData?.address || "NA",
          certificateNumber: applicationData?.applicationNumber || "NA",
          issueDate: applicationData?.fromDate || "NA",
          validUpto: applicationData?.toDate || "NA",
          certificateStatus: applicationData?.status || "NA",
        }
      ])
      setistable(true);
    } else {
      setShowToast({ label: "Application doesn't exist", warning: true })
    }

    resetCaptcha();
  }

  return (
    <React.Fragment>
      <div style={{width:"80%", marginLeft: "10%"}}>
        <div className="h1" style={{ fontSize: "40px", fontFamily: "Roboto Condensed" }}>{t("SEARCH_CERTIFICATE")}</div>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchField>
            <label className="astericColor" style={{ fontSize: "19px" }} >{t("CERTIFICATE_TYPE")}</label>
            <Controller
              control={control}
              name="certificateType"
              render={(props) => (
                <Dropdown
                  selected={certificate_name}
                  select={setCertificate_name}
                  onBlur={props.onBlur}
                  option={certificateTypes}
                  optionKey="i18nKey"
                  t={t}
                  disable={false}
                  placeholder={"Please type and select the certificate type"}
                />
              )}
            />
          </SearchField>
          <SearchField>
            <label className="astericColor" style={{ fontSize: "19px" }}>{t("CERTIFICATE_NUMBER")}</label>
            <TextInput
              name="certificateNo"
              t={t}
              type={"text"}
              optionKey="i18nKey"
              placeholder={"Please enter unique certificate number"}
              value={certificate_No}
              onChange={setcertificate_No}
            />
          </SearchField>
          <SearchField>
            <ReCAPTCHA
              // sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // testing sitekey (can be used if you don't have a real sitekey)
              sitekey="6LfoM5MqAAAAAAQkwtM6X-IGwdURyY50WwvcaA_g"
              onChange={handleCaptchaChange}
            />
          </SearchField>

          <SearchField className="submit">
            <SubmitBar
              label={t("ES_COMMON_SEARCH")}
              submit
              disabled={!ishuman || !certificate_name || !certificate_No}
            />
            <p
              style={{ marginTop: "10px" }}
              onClick={() => {
                reset({
                  applicationNo: "",
                  fromDate: today,
                  toDate: today,
                  status: "",
                  offset: 0,
                  limit: 10,
                  sortBy: "commencementDate",
                  sortOrder: "DESC",
                });
                setShowToast(null);
                setistable(false);
                setIshuman(false);
                setCertificate_name("");
                setCertificate_No("");
                resetCaptcha();
              }}
            >
              {t(`ES_COMMON_CLEAR_ALL`)}
            </p>
          </SearchField>
        </SearchForm>
        {applicationData !== "" && isLoading && istable && <Loader/>}
        {istable && (
          <Table
            t={t}
            data={updatedData}
            columns={columns}
            getCellProps={(cellInfo) => {
              return {
                style: {
                  minWidth: cellInfo.column.Header === t("CM_INBOX_APPLICATION_NO") ? "240px" : "",
                  padding: "20px 18px",
                  fontSize: "16px",
                },
              };
            }}
            isPaginationRequired={false}
          />
        )}

        {showToast && (
          <Toast
            error={showToast.error}
            warning={showToast.warning}
            label={t(showToast.label)}
            isDleteBtn={true}
            onClose={() => {
              setShowToast(null);
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default CMSearchCertificate;