package org.egov.council.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.egov.commons.EgwStatus;
import org.egov.infra.persistence.validator.annotation.Unique;
import org.egov.infra.workflow.entity.StateAware;
import org.egov.search.domain.Searchable;

@Entity
@Unique(id = "id", tableName = "egcncl_meeting", fields = "meetingNumber", columnName = "meetingNumber", enableDfltMsg = true)
@Table(name = "egcncl_meeting")
@Searchable
@SequenceGenerator(name = CouncilMeeting.SEQ_MEETING, sequenceName = CouncilMeeting.SEQ_MEETING, allocationSize = 1)
public class CouncilMeeting  extends StateAware {

    private static final long serialVersionUID = 5607959287745538396L;

    public static final String SEQ_MEETING = "seq_egcncl_meeting";

    @Id
    @GeneratedValue(generator = SEQ_MEETING, strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "committeeType")
    private CommitteeType committeeType;

   
    @Column(name = "meetingNumber")
    private String meetingNumber;

    @Temporal(TemporalType.DATE)
    @Column(name = "meetingDate")
    private Date meetingDate;

    @Column(name = "meetingTime")
    private String meetingTime;

    @Column(name = "meetingLocation")
    private String meetingLocation;

    @ManyToOne
    @JoinColumn(name = "status")
    private EgwStatus status;
    
    
    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    private List<MeetingMOM> meetingMOMs = new ArrayList<MeetingMOM>(0);

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    private List<MeetingAttendence> meetingAttendence = new ArrayList<MeetingAttendence>(0);
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CommitteeType getCommitteeType() {
        return committeeType;
    }

    public void setCommitteeType(CommitteeType committeeType) {
        this.committeeType = committeeType;
    }

    public String getMeetingNumber() {
        return meetingNumber;
    }

    public void setMeetingNumber(String meetingNumber) {
        this.meetingNumber = meetingNumber;
    }

    public Date getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(Date meetingDate) {
        this.meetingDate = meetingDate;
    }

    public String getMeetingLocation() {
        return meetingLocation;
    }

    public void setMeetingLocation(String meetingLocation) {
        this.meetingLocation = meetingLocation;
    }

    public EgwStatus getStatus() {
        return status;
    }

    public void setStatus(EgwStatus status) {
        this.status = status;
    }

    public String getMeetingTime() {
        return meetingTime;
    }

    public void setMeetingTime(String meetingTime) {
        this.meetingTime = meetingTime;
    }

    @Override
    public String getStateDetails() {
        return String.format("Meeting Number %s ", meetingNumber);
    }

    public List<MeetingMOM> getMeetingMOMs() {
        return meetingMOMs;
    }

    public void setMeetingMOMs(List<MeetingMOM> meetingMOMs) {
        this.meetingMOMs = meetingMOMs;
    }
    
    public void addMeetingMoms(MeetingMOM meetingMom)
    {
        this.meetingMOMs.add(meetingMom);
    }

    public List<MeetingAttendence> getMeetingAttendence() {
        return meetingAttendence;
    }

    public void setMeetingAttendence(List<MeetingAttendence> meetingAttendence) {
        this.meetingAttendence = meetingAttendence;
    }

}
