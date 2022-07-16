namespace Model
{
    public class UnitJob
    {
        public JobType JobType { get; set; }
        public long StartTick { get; set; }

    }

    public enum JobScheduleType
    {
        OnceInQueue,
        Repeat,
        MostProfitableFirst
    }

    public class UnitJobs
    {
        public List<JobType> JobTypes { get; set; } = new List<JobType>();
        public JobScheduleType JobScheduleType { get; set; }


    }
}
