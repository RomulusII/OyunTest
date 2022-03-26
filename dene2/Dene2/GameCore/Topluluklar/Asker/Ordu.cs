namespace GameCore.Topluluklar.Asker
{
    public class Ordu : Topluluk
    {
        public Dictionary<AskerTip, Birlik> Birlikler { get; }

        public Ordu()
        {
            Tip = ToplulukTipleri.Asker;

            Birlikler = new Dictionary<AskerTip, Birlik>();

            foreach (AskerTip t in Enum.GetValues(typeof(AskerTip)))
            {
                Birlikler.Add(t, new Birlik(t));
            }
        }
    }
}
