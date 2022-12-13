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
    private Date created_at;
    private Date updated_at;
    private User owner;
    private List<Issue> issues;
}
