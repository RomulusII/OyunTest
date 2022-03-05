using System.Collections.Generic;

namespace Model
{
    public class AbilityPrototypes
    {


        public static IDictionary<AbilityType, AbilityPrototype> List { get; private set; }

        public AbilityPrototypes()
        {
            List = new Dictionary<AbilityType, AbilityPrototype> ();

            AddAbilityPrototype(AbilityType.AnimalHusbandry, Tier.Tier0);
            AddAbilityPrototype(AbilityType.Axt, Tier.Tier0);
            AddAbilityPrototype(AbilityType.Blacksmithing, Tier.Tier0);
            AddAbilityPrototype(AbilityType.Bow, Tier.Tier0);
            AddAbilityPrototype(AbilityType.Farming, Tier.Tier0);
            AddAbilityPrototype(AbilityType.Fishing, Tier.Tier0);
            AddAbilityPrototype(AbilityType.Forestry, Tier.Tier0);
            AddAbilityPrototype(AbilityType.Governing, Tier.Tier2);

        }

        private void AddAbilityPrototype(AbilityType abilityType, Tier tier)
        {
            List.Add(abilityType, new AbilityPrototype(abilityType, tier));
        }
    } 


}