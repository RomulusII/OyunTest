using System.Diagnostics;
using System.Drawing;

namespace WpfApplication1.Alan
{
    public class HucreDetay
    {
        public enum HucreArazi
        {
            NotSet = 0,
            Buzul = 1,
            Deniz = 2,
            Okyanus = 3,
            Tundra = 4,
            IslakArazi = 5,
            Otlak = 6,
            Bozkir = 7,
            KurakArazi = 8,
            Cöl = 9
        }

        public enum HucreYukseklik
        {
            NotSet = 0,
            Deniz = 1,
            Ova = 2,
            Tepelik = 3,
            Daglik = 4,
            Yayla = 5
        }

        public enum HucreNehir
        {
            NotSet,
            Yok,
            Dere,
            Nehir,
            Delta
        }

        public enum HucreVejetasyon
        {
            NotSet,
            Yok,
            Orman
        }

        public HucreArazi Arazi;
        public HucreYukseklik Yukseklik;
        public HucreNehir Nehir;
        public HucreVejetasyon Vejetasyon;

        private readonly Koordinat _koordinat;

        public string TanimsizInfo = string.Empty;
        public Color TanimsizRenk;

        public HucreDetay(Koordinat koordinat, Color zemin, Color yukseklik, Color vejetasyon, Color nehir)
        {
            _koordinat = koordinat;
            Arazi = DecodeArazi(zemin);
            Yukseklik = DecodeYukseklik(yukseklik);
            Vejetasyon = DecodeVejetasyon(vejetasyon);
            Nehir = DecodeNehir(nehir);
        }

        private void RenkTanimsiz(string tip, Color renk)
        {
            TanimsizInfo = $"Tanimsiz {tip} koordinat ({_koordinat.X},{_koordinat.Y}), renk-Name: {renk.Name} renk-Argb: {renk.ToArgb() & 0xffffff} {renk}";
            TanimsizRenk = renk;
            Debug.WriteLine(TanimsizInfo);
        }
        private HucreArazi DecodeArazi(Color renk)
        {
            switch ((uint) renk.ToArgb())
            {
                case 0xff000000:
                    return HucreArazi.Deniz;
                case 0xffffff00:
                    return HucreArazi.Cöl;
                case 0xff00ffff:
                case 0xff818500:
                    return HucreArazi.Buzul;
                case 0xffff0000:
                    return HucreArazi.Bozkir;
                case 0xff0000ff:
                    return HucreArazi.Tundra;
                case 0xff008000:
                    return HucreArazi.KurakArazi;
                case 0xff00ff00:
                    return HucreArazi.Otlak;

                default:
                    RenkTanimsiz("Arazi", renk);
                    return HucreArazi.NotSet;
            }
        }

        private HucreYukseklik DecodeYukseklik(Color renk)
        {
            switch ((uint) renk.ToArgb())
            {
                case 0xffffffff:
                    return HucreYukseklik.Deniz;
                case 0xff000000:
                    return HucreYukseklik.Ova;
                //case 0xffff00ff:
                case 0xffff00ff:
                    return HucreYukseklik.Tepelik;
                case 0xff800000:
                case 0xff800080:
                    return HucreYukseklik.Daglik;
                default:
                    RenkTanimsiz("Yukseklik", renk);

                    return HucreYukseklik.NotSet;
            }
        }

        private HucreVejetasyon DecodeVejetasyon(Color renk)
        {
            switch ((uint) renk.ToArgb())
            {
                case 0xff000000:
                case 0xffffffff:
                case 0xffc0c0c0:
                    return HucreVejetasyon.Yok;
                case 0xff008000:
                case 0xff008080:
                    return HucreVejetasyon.Orman;
                default:
                    RenkTanimsiz("Vejetasyon", renk);
                    return HucreVejetasyon.NotSet;
            }
        }

        private HucreNehir DecodeNehir(Color renk)
        {
            switch ((uint) renk.ToArgb())
            {
                case 0xffffffff:
                case 0xff000000:
                    return HucreNehir.Yok;
                case 0xff0000ff:
                    return HucreNehir.Nehir;

                default:
                    RenkTanimsiz("Nehir", renk);
                    return HucreNehir.NotSet;
            }
        }
    }
}