```mermaid
sequenceDiagram
    Actor User as User
    participant FE as "FRONTEND / Expo Web"
    Participant BE as "ExpressJS+ MongoDB Backend"
box PYTHON SERVER (Stateless)
    participant DS
    participant DL
end

    User ->> FE: Log In
    FE ->> BE: Send Login Data
    BE -->> FE: Authenticate User

    User ->> FE: Take Initial Assessment
    FE ->> BE: Send vocab (Assessment) Data
    BE ->> DS: Send vocab (Assessment) Data
    DS -->> FE: Run Recommendation Model to create Exercise List

    User ->> FE: Start Exercise
    FE ->> BE: Send Audio recording to BE for storage
    BE ->> DL: Send Audio recording
    DL -->> BE: Analyze Audio recording
    BE -->> FE: Send Exercise Result


    User ->> FE: Exits Exercise
    FE ->> BE: Send updated vocab Data
    BE ->> DS: Send updated vocab Data
    DS -->> FE: Run Recommendation Model & Adjust Exercise List

    User ->> FE: View Dashboard
    BE ->> FE: Send Exercise Logs (dashboard)






```
