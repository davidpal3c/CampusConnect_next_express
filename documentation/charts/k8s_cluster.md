``` mermaid
flowchart TD
    subgraph Kubernetes_Cluster["Kubernetes Cluster"]
        LB[Load Balancer Service] -->|Routes Traffic| BlueOrGreen{"Environment Selector"}
        
        subgraph Blue["Active Environment (Blue)"]
            direction TB
            B_FE["Frontend Pods (Blue)"] --> B_BE["Backend Pods (Blue)"]
            B_BE --> B_DB[(Database)]
        end
        
        subgraph Green["Standby Environment (Green)"]
            direction TB
            G_FE["Frontend Pods (Green)"] --> G_BE["Backend Pods (Green)"]
            G_BE --> G_DB[(Database)]
        end
        
        BlueOrGreen -->|Current: Blue| B_FE
        BlueOrGreen -->|Standby: Green| G_FE
    end
    
    Users -->|Traffic| LB
    CI_CD[CI/CD Pipeline] -->|Builds & Deploys| Green
    CI_CD -->|Switches Traffic| BlueOrGreen
```