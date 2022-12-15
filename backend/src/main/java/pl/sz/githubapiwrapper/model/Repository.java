package pl.sz.githubapiwrapper.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Repository {
    private String name;
    private String description;
    private String html_url;
    private String clone_url;
    private String ssh_url;
    private Date created_at;
    private Date updated_at;
    private User owner;
    private Integer subscribers_count;
    private Integer forks;
    private Integer open_issues;
    private List<Issue> issues;
}
