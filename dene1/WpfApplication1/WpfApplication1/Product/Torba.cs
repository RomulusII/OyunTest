using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;

namespace WpfApplication1.Product
{
    public class Torba : IXmlSerializable
    {
        public double Yemek { get; set; }

        public double Odun { get; set; }
        public double Tas { get; set; }
        public double Demir { get; set; }

        public double Altin { get; set; }

        public double Alet { get; set; }
        public double Ipek { get; set; }
        public double Cam { get; set; }
        public double Mermer { get; set; }
        public double Mücevher { get; set; }
        public double Silah { get; set; }


        public XmlSchema GetSchema()
        {
            return null;
        }

        public void ReadXml(XmlReader reader)
        {
            reader.ReadToDescendant("Yemek");
            Yemek = reader.ReadElementContentAsDouble();
            reader.ReadToDescendant("Odun");
            Odun = reader.ReadElementContentAsDouble();
            reader.ReadToDescendant("Tas");
            Tas = reader.ReadElementContentAsDouble();
        }

        public void WriteXml(XmlWriter writer)
        {
            //writer.WriteStartElement();
            writer.WriteElementString("Yemek", Yemek.ToString("0.######"));
            writer.WriteElementString("Odun", Odun.ToString("0.######"));
            writer.WriteElementString("Tas", Tas.ToString("0.######"));
            //writer.WriteEndElement();
        }
    }
}
