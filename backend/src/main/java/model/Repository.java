package model;

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
    private Date created;
    private Date updated;
    private User owner;
    private List<Issue> issues;
}
