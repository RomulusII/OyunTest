using GameCore.Map;
using System.Diagnostics;
using System.Drawing;
using System.Threading.Tasks;

namespace Backoffice.Main.MapCreation
{

    public class HaritaYaratici
    {
        public Map Map { get; set; }

        public delegate void TanimsizRenkHandler(int x, int y, HaritaHucresi hucre);

        public event TanimsizRenkHandler OnTanimsizRenk;

        private const string ZeminHaritaPng = "Haritalar\\avrasya-arazi.fw.bmp";
        private const string OrmanHaritaPng = "Haritalar\\avrasya orman.fw.bmp";
        private const string DagTepeHaritaPng = "Haritalar\\avrasya.yukseklik.fw.bmp";
        private const string NehirHaritaPng = "Haritalar\\avrasya-nehir.fw.bmp";

        public Bitmap ZeminHarita { get; }
        public Bitmap OrmanHarita { get; }
        public Bitmap DagHarita { get; }
        public Bitmap NehirHarita { get; }

        public Bitmap GetMap(MapType mapType)
        {
            return mapType switch
            {
                MapType.Soil => ZeminHarita,
                MapType.Vegetation => OrmanHarita,
                MapType.Elevation => DagHarita,
                MapType.Water => NehirHarita,
                _ => ZeminHarita
            };
        }

        public HaritaYaratici(Map map)
        {
            Map = map;

            ZeminHarita = new Bitmap(ZeminHaritaPng);
            OrmanHarita = new Bitmap(OrmanHaritaPng);
            DagHarita = new Bitmap(DagTepeHaritaPng);
            NehirHarita = new Bitmap(NehirHaritaPng);

            Map.MaxX = ZeminHarita.Width;
            Map.MaxY = ZeminHarita.Height;
        }

        public void InitHucreler()
        {
            Map.Hucreler = new HaritaHucresi[Map.MaxX, Map.MaxY];
            
            var adet = 0;

            for (var y = 0; y < Map.MaxY; y++)
            {
                for (var x = 0; x < Map.MaxX; x++)
                {
                    var haritaPixel = ZeminHarita.GetPixel(x, y);
                    var yuksekPixel = DagHarita.GetPixel(x, y);
                    var ormanPixel = OrmanHarita.GetPixel(x, y);
                    var nehirPixel = NehirHarita.GetPixel(x, y);
                    var hucre = new HaritaHucresi(new Koordinat(x, y), haritaPixel, yuksekPixel, ormanPixel, nehirPixel);
                    //var hucre = await Task.Run(() => new HaritaHucresi(new Koordinat(x, y), haritaPixel, yuksekPixel, ormanPixel, nehirPixel));
                    Map.Hucreler[x, y] = hucre;
                    adet++;

                    if (hucre.HucreDetay.TanimsizInfo != string.Empty)
                    {
                        OnTanimsizRenk?.Invoke(x, y, hucre);
                        return;
                    }
                }
            }
            Debug.WriteLine($"adet: {adet}");
        }

    }
}