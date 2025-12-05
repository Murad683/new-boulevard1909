import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import { Search } from "lucide-react";

type MenuItem = {
  name: string;
  price?: string;
  description?: string;
};

type MenuSection = {
  id: string;
  name: string;
  items?: MenuItem[];
  columns?: MenuItem[][];
};

type MainCategory = {
  id: string;
  name: string;
  sections: MenuSection[];
};

const sections: Record<string, MenuSection> = {
  coldAppetizers: {
    id: "cold-appetizers",
    name: "Soyuq qəlyanaltılar",
    columns: [
      [
        { name: "Tərəvəz buketi", price: "14" },
        { name: "Pendir çeşidləri", price: "35" },
        { name: "Naxçıvan pendiri", price: "12" },
        { name: "Qarışıq zeytun 150/400 qr", price: "8/16" },
        { name: "Turşu çeşidləri 500 qr", price: "14" },
        { name: "Badımcan ləvəngi", price: "12" },
        { name: "Pomidor məzəsi", price: "9" },
        { name: "Acılı tərəvəz məzəsi", price: "8" },
        { name: "Ev sayağı ət assorti", price: "42" },
      ],
      [
        { name: "Lobya fəsincan", price: "12" },
        { name: "Mastı xiyər", price: "6" },
        { name: "Qulançar turşusu", price: "7" },
        { name: "Dil salatı", price: "14" },
        { name: "Çanaq pendiri çoban salatı", price: "10" },
        { name: "Toyuq ciyəri paşteti meyvə sosu ilə", price: "14" },
        { name: "Allah və pomidorlu salat", price: "14" },
        { name: "Xırt-vırt badımcan salatı", price: "14" },
        { name: "Bulvar salatı", price: "22" },
      ],
    ],
  },
  soups: {
    id: "soups",
    name: "Şorbalar",
    items: [
      { name: "Kənd çolpası şorbası", price: "10" },
      { name: "Düşbərə", price: "10" },
      { name: "Qurutlu əriştə şorbası", price: "13" },
      { name: "Əli, noxudlu doyğa", price: "14" },
    ],
  },
  hotAppetizers: {
    id: "hot-appetizers",
    name: "İsti qəlyanaltılar",
    items: [
      { name: "Ətli qutab", price: "4" },
      { name: "Göyərtili qutab", price: "3" },
      { name: "Balqabaqlı qutab", price: "4" },
      { name: "Xırt-vırt blinçik (ətli / ispanaqlı)", price: "4/3" },
      { name: "Göyərti küküsü", price: "10" },
      { name: "Qoz küküsü", price: "10" },
      { name: "Pendirli qatlama manqalda", price: "15" },
      { name: "Ətli blinçik manqalda", price: "18" },
    ],
  },
  hotDishes: {
    id: "hot-dishes",
    name: "İsti yeməklər",
    columns: [
      [
        { name: "Kartof dolması pomidor azması ilə", price: "28" },
        { name: "Bakı küftə-bozbəşi", price: "28" },
        { name: "Zirincili şirəli dana", price: "34" },
        { name: "Şəki piti", price: "24" },
        { name: "Quzu boynu sobada", price: "64" },
      ],
      [
        { name: "Qovurma", price: "34" },
        { name: "Heyva dolması", price: "25" },
        { name: "Tərəvüz dolması", price: "22" },
        { name: "Soğan dolması noxud püresi ilə", price: "24" },
        { name: "Tarhunlu can əti", price: "32" },
        { name: "Kənd çolpası ləvəngi", price: "34" },
      ],
    ],
  },
  panDishes: {
    id: "pan-dishes",
    name: "Tava yeməkləri",
    items: [
      { name: "Sac quzu əti ilə (4 nəfərlik)", price: "65" },
      { name: "Sac can əti ilə (4 nəfərlik)", price: "75" },
      { name: "Sac toyuq əti ilə (4 nəfərlik)", price: "55" },
      { name: "Kəllə beyin (2 nəfərlik)", price: "40" },
      { name: "Qızıl balıq surğaq", price: "32" },
      { name: "Quzu qabırğalı nar qovurma", price: "38" },
      { name: "Şabalıdlı (2 nəfərlik)", price: "38" },
      { name: "Çoban qovurma quzu maçası ilə", price: "38" },
      { name: "Qaymaq sousunda ispanaqlı qızılbalıq", price: "42" },
    ],
  },
  doughDishes: {
    id: "dough-dishes",
    name: "Xəmir yeməkləri",
    items: [
      { name: "Qıymalı yarpaq xingəl", price: "18" },
      { name: "Çolpalı yarpaq xingəl", price: "18" },
      { name: "Gürzə (soyuq / qızartma)", price: "16" },
      { name: "Fəsəli", price: "6" },
    ],
  },
  pilafs: {
    id: "pilafs",
    name: "Plovlar",
    items: [
      { name: "Qəbələ plov", price: "32" },
      { name: "Şüyüdlü, paxlalı plov quzu qolu ilə", price: "29" },
      { name: "Turşu qovurma plov", price: "29" },
    ],
  },
  kebabs: {
    id: "kebabs",
    name: "Kabablar",
    columns: [
      [
        { name: "Toyuq lülə", price: "15" },
        { name: "Döymə lülə", price: "18" },
        { name: "Quzu tikə", price: "22" },
        { name: "Quzu antrikot", price: "26" },
        { name: "Dana basdırma", price: "24" },
        { name: "Quzu basdırma", price: "24" },
        { name: "Toyuq kababı", price: "15" },
      ],
      [
        { name: "Nərə balığı kababı", price: "95" },
        { name: "Səktədə bütöv çolpa", price: "29" },
        { name: "Xan kababı", price: "18" },
        { name: "Maça kababı", price: "17" },
        { name: "Tərəvəz kababı", price: "8" },
        { name: "Küldə kabab", price: "8" },
      ],
    ],
  },
  desserts: {
    id: "desserts",
    name: "Desertlər",
    columns: [
      [
        { name: "Azərbaycan milli bişmələri", price: "18/35" },
        { name: "Qoz şirniyyatı", price: "18" },
        { name: "Abşeron Tortu", price: "18" },
        { name: "Ballı Tort", price: "18" },
        { name: "Nağıl Tortu", price: "18" },
      ],
      [
        { name: "San Sebastian", price: "18" },
        { name: "Kiev sayağı Tort", price: "18" },
        { name: "Gelato Dondurma", price: "12" },
        { name: "Dondurma", price: "5" },
        { name: "Qarışıq meyvə", price: "25" },
      ],
    ],
  },
  winterMenu: {
    id: "winter-menu",
    name: "Qış menyusu",
    items: [
      { name: "Çəpiş pörtdəməsi", price: "28" },
      { name: "Çəpiş kababı", price: "24" },
      { name: "Hind toyuğu kababı", price: "22" },
      { name: "Hind toyuğu qaymaqlı sağısıda", price: "35" },
      { name: "Ev sayağı Sulhulu", price: "24" },
      { name: "Gərəf saxsıda", price: "38" },
      { name: "Şabalıdlı Turac nar qovurması", price: "52" },
      { name: "Hind toyuğu dolması", price: "29" },
    ],
  },
  softDrinks: {
    id: "soft-drinks",
    name: "Soft Drinks",
    items: [
      { name: "Sirab (still water) 330/750 ml", price: "6/10" },
      { name: "Sirab (sparkling water) 330/750 ml", price: "6/10" },
      { name: "Aqua Panna 250/750 ml", price: "10/15" },
      { name: "San Pellegrino 250/750 ml", price: "10/15" },
      { name: "Cola / Cola Zero / Fanta / Sprite", price: "7" },
      { name: "Juice Varieties", price: "8" },
      { name: "Fresh Juice", price: "12" },
      { name: "Fruit compote 1 L", price: "10" },
      { name: "Red Bull / Red Bull Sugar Free", price: "12" },
      { name: "Shalgam (spicy – non-spicy)", price: "7" },
      { name: "Tonic Water", price: "9" },
    ],
  },
  lemonade: {
    id: "lemonade",
    name: "Lemonade",
    items: [{ name: "Homemade lemonade", price: "9/25" }],
  },
  tea: {
    id: "tea",
    name: "Tea",
    items: [
      { name: "Lankaran tea", price: "15" },
      { name: "Herbal teas varieties", price: "18" },
      { name: "Ginger", price: "20" },
      { name: "Winter tea", price: "20" },
    ],
  },
  coffee: {
    id: "coffee",
    name: "Coffee",
    items: [
      { name: "Espresso", price: "6" },
      { name: "Americano", price: "8" },
      { name: "Turkish coffee", price: "7" },
      { name: "Cappuccino", price: "9" },
      { name: "Raf", price: "10" },
    ],
  },
  beer: {
    id: "beer",
    name: "Beer",
    items: [
      { name: "Xırdalan", price: "8" },
      { name: "Xırdalan Draft", price: "8" },
      { name: "Heineken", price: "14" },
      { name: "Erdinger", price: "16" },
      { name: "Erdinger 0", price: "14" },
      { name: "Hoegaarden", price: "16" },
      { name: "Corona", price: "16" },
    ],
  },
  cocktail: {
    id: "cocktail",
    name: "Cocktail",
    items: [
      { name: "Gül bağı", price: "20" },
      { name: "İpak Yolu", price: "21" },
      { name: "Buta", price: "22" },
      { name: "Mirvari", price: "22" },
      { name: "İçərişəhər", price: "22" },
      { name: "Fayton", price: "25" },
    ],
  },
  infusion: {
    id: "infusion",
    name: "Infusion",
    items: [
      { name: "Homemade types of infusion – 40 ml", price: "8" },
      { name: "Meyvi types of infusion – 40/700 ml", price: "6/95" },
    ],
  },
  liqueur: {
    id: "liqueur",
    name: "Liqueur",
    items: [
      { name: "Meyvi types of Liquor – 40/500 ml", price: "10/120" },
      { name: "Jagermeister – 40/1000 ml", price: "14/180" },
    ],
  },
  raki: {
    id: "raki",
    name: "Raki",
    items: [
      { name: "Tekirdağ – 40/700 ml", price: "14/170" },
      { name: "Yeni Rakı – 40/700 ml", price: "16/180" },
    ],
  },
  rum: {
    id: "rum",
    name: "Rum",
    items: [
      { name: "Captain Morgan White – 40/1000 ml", price: "11/160" },
      { name: "Captain Morgan Dark – 40/1000 ml", price: "11/160" },
      { name: "Bacardi White – 40/1000 ml", price: "11/160" },
      { name: "Matusalem 15 – 40/700 ml", price: "16/220" },
      { name: "Zacapa 23 – 40/700 ml", price: "25/400" },
      { name: "Zacapa XO – 40/700 ml", price: "51/800" },
    ],
  },
  whisky: {
    id: "whisky",
    name: "Whisky",
    items: [
      { name: "Jameson – 40/700 ml", price: "12/200" },
      { name: "Jack Daniel’s – 40/700 ml", price: "13/205" },
      { name: "Monkey Shoulder – 40/700 ml", price: "14/215" },
      { name: "Chivas 12 – 40/700 ml", price: "14/240" },
      { name: "Chivas 18 – 40/700 ml", price: "24/400" },
      { name: "Woodford Bourbon – 40/700 ml", price: "17/270" },
      { name: "Glenmorangie 12 – 40/700 ml", price: "17/290" },
      { name: "Glenfiddich 15 – 40/700 ml", price: "24/395" },
      { name: "Glenfiddich 18 – 40/700 ml", price: "35/610" },
      { name: "Macallan 12 Double Cask – 40/700 ml", price: "28/490" },
      { name: "Macallan 18 Double Cask – 40/700 ml", price: "115/1950" },
      { name: "Hibiki Harmony – 40/700 ml", price: "60/1050" },
      { name: "Yamazaki – 40/700 ml", price: "115/1950" },
    ],
  },
  vodka: {
    id: "vodka",
    name: "Vodka",
    items: [
      { name: "Elendorff – 40/700 ml", price: "8/80" },
      { name: "Meyvi Types of Fruit Vodka – 40/500 ml", price: "9/100" },
      { name: "Savalan quince vodka – 40/500 ml", price: "9/100" },
      { name: "Stumbas Classic – 40/700 ml", price: "9/155" },
      { name: "Absolut – 40/700 ml", price: "9/130" },
      { name: "Xan 1860 – 40/700 ml", price: "10/140" },
      { name: "Finlandia – 40/1000 ml", price: "10/145" },
      { name: "Summum – 40/700 ml", price: "10/170" },
      { name: "Belvedere – 40/700 ml", price: "13/205" },
      { name: "Reyka – 40/700 ml", price: "13/210" },
      { name: "Chopin Potato – 40/700 ml", price: "14/225" },
      { name: "Chopin Wheat – 40/700 ml", price: "16/250" },
      { name: "Onegin – 50/500/700 ml", price: "14/165/200" },
      { name: "Grey Goose – 40/500/700 ml", price: "17/210/250" },
      { name: "Grey Cardinal – 500 ml", price: "150" },
    ],
  },
  tequila: {
    id: "tequila",
    name: "Tequila",
    items: [
      { name: "Olmeca Altos – 40/700 ml", price: "12/170" },
      { name: "El Tequileno Blanco – 40/700 ml", price: "11/180" },
      { name: "Jose Cuervo Blanco – 40/700 ml", price: "12/185" },
      { name: "Patrón Silver – 40/700 ml", price: "20/340" },
      { name: "Don Julio Blanco – 40/700 ml", price: "22/370" },
      { name: "Don Julio Reposado – 40/700 ml", price: "25/400" },
      { name: "Lokita Blanco – 700 ml", price: "300" },
      { name: "Patrón Reposado – 700 ml", price: "420" },
      { name: "Don Julio Añejo – 700 ml", price: "470" },
      { name: "Don Julio 1942 – 700 ml", price: "1450" },
    ],
  },
  grappa: {
    id: "grappa",
    name: "Grappa",
    items: [
      { name: "Savalan Grappolo – 40/500 ml", price: "10/110" },
      { name: "Astoria Grappa Val de Brun – 40/700 ml", price: "10/135" },
      { name: "Ruffino Grappa da Bolgheri – 700 ml", price: "420" },
      { name: "Grappa Sassicaia – 700 ml", price: "600" },
    ],
  },
  gin: {
    id: "gin",
    name: "Gin",
    items: [
      { name: "Beefeater – 40/1000 ml", price: "14/240" },
      { name: "Bombay Sapphire – 40/1000 ml", price: "14/250" },
      { name: "Gin Mare – 40/700 ml", price: "16/250" },
      { name: "Etsu Japanese Gin – 40/700 ml", price: "17/310" },
      { name: "Hendrick’s – 40/1000 ml", price: "18/370" },
      { name: "Tanqueray No. Ten – 40/1000 ml", price: "18/370" },
    ],
  },
  brandy: {
    id: "brandy",
    name: "Brandy",
    items: [
      { name: "Abşeron VSOP – 40 ml", price: "10" },
      { name: "Azerbaijan XO – 40 ml", price: "14" },
      { name: "Xan Brandy XO – 40 ml", price: "15" },
      { name: "Hennessy VS – 40 ml", price: "18" },
      { name: "Rémy Martin VSOP – 40 ml", price: "21" },
      { name: "Martell VSOP – 40 ml", price: "24" },
      { name: "Hennessy VSOP – 40 ml", price: "32" },
      { name: "Rémy Martin XO – 40 ml", price: "90" },
      { name: "Hennessy XO – 40 ml", price: "95" },
    ],
  },
  whiteWine: {
    id: "white-wine",
    name: "White Wine",
    items: [
      { name: "Meysari Bulluri", price: "16/70", description: "Azerbaijan" },
      { name: "Meysari Sadaf", price: "70", description: "Azerbaijan" },
      { name: "Meysari Mahru", price: "70", description: "Azerbaijan" },
      { name: "Amobokoboko Blanco Chenin Blanc", price: "100", description: "South Africa" },
      { name: "El Coto Blanco", price: "24/110", description: "Spain" },
      { name: "Trebbiano d’Abruzzo", price: "115", description: "Italy" },
      { name: "Ruffino Pinot Grigio delle Venezie DOC Lumina", price: "115", description: "Italy" },
      { name: "SM Chardonnay Vigneti Delle", price: "135", description: "Italy" },
      { name: "Soave Allegrini", price: "165", description: "Italy" },
      { name: "Grigio Campagnola", price: "165", description: "Italy" },
      { name: "Donnafugata Sur Sur Grillo", price: "160", description: "Italy" },
      { name: "Colli Orientali Anna Livio Felluga Pinot Grigio Friuli", price: "220", description: "Italy" },
      { name: "Gavi Monfiore Cortese, Piedmont", price: "210", description: "Italy" },
      { name: "Fontanafredda Gavi del Comune di Gavi DOCG", price: "275", description: "Italy" },
      { name: "Corte del Lupo Bianco Curtefranca", price: "290", description: "Italy" },
      { name: "Rheingau Riesling Trocken", price: "145", description: "Germany" },
      { name: "Perrin Réserve Blanc Côtes du Rhône", price: "125", description: "France" },
      { name: "Sancerre Blanc Sauvignon Blanc, Loire", price: "185", description: "France" },
      { name: "Clarendelle Blanc", price: "220", description: "France" },
      { name: "Joseph Drouhin Chablis", price: "295", description: "France" },
      { name: "Jean Paul Chablis", price: "210", description: "France" },
      { name: "Perrin Les Sinards Châteauneuf-du-Pape Blanc", price: "325", description: "France" },
      { name: "Meursault Albert Bichot", price: "520", description: "France" },
      { name: "Matua Sauvignon Blanc Marlborough", price: "190", description: "New Zealand" },
      { name: "Misty Cove Sauvignon Blanc", price: "110", description: "New Zealand" },
      { name: "Penfolds Max’s Chardonnay", price: "225", description: "Australia" },
    ],
  },
  roseWine: {
    id: "rose-wine",
    name: "Rose Wine",
    items: [
      { name: "Meysari Sanam", price: "16/70", description: "Azerbaijan" },
      { name: "Ruffino Chianti DOCG Rosso", price: "125", description: "Italy" },
      { name: "Donnafugata Lumera", price: "165", description: "Italy" },
      { name: "Clarendelle Rosé", price: "145", description: "France" },
      { name: "Chateau D’Esclans Whispering Angel", price: "240", description: "France" },
    ],
  },
  redWine: {
    id: "red-wine",
    name: "Red Wine",
    items: [
      { name: "Meysari Innabi", price: "17/75", description: "Azerbaijan" },
      { name: "Meysari Marjan", price: "75", description: "Azerbaijan" },
      { name: "Meysari Asmar", price: "70", description: "Azerbaijan" },
      { name: "Meysari Makhmari", price: "90", description: "Azerbaijan" },
      { name: "El Coto Crianza", price: "125", description: "Spain" },
      { name: "LAN Crianza", price: "165", description: "Spain" },
      { name: "LAN Reserva", price: "175", description: "Spain" },
      { name: "MHCS Numanthia Termes", price: "245", description: "Spain" },
      { name: "Concha y Toro Frontera Merlot", price: "24/115", description: "Chile" },
      { name: "Terramater Zinfandel Maipú", price: "125", description: "Chile" },
      { name: "Casillero del Diablo Cabernet Sauvignon", price: "135", description: "Chile" },
      { name: "Kno­cope Pinotage Cadet", price: "165", description: "South Africa" },
      { name: "Misty Cove Pinot Noir", price: "185", description: "New Zealand" },
      { name: "Matua Pinot Noir", price: "210", description: "New Zealand" },
      { name: "Perrin Réserve Rouge Côtes du Rhône", price: "155", description: "France" },
      { name: "Château Timberlay Bordeaux Supérieur", price: "165", description: "France" },
      { name: "Châteauneuf-du-Pape", price: "375", description: "France" },
      { name: "Louis Jadot Bourgogne Pinot Noir", price: "220", description: "France" },
      { name: "Château Nenin AOP Pomerol 2021", price: "950", description: "France" },
      { name: "Château Smith Haut Lafitte", price: "1750", description: "France" },
      { name: "Montepulciano d’Abruzzo", price: "25/120", description: "Italy" },
      { name: "Bardolino Classico Campagnola", price: "135", description: "Italy" },
      { name: "Synthesi Aglianico del Vulture Paternoster", price: "135", description: "Italy" },
      { name: "Zenato Merlot Garda", price: "155", description: "Italy" },
      { name: "Chianti Superiore 2022", price: "145", description: "Italy" },
      { name: "Rosso di Montalcino", price: "185", description: "Italy" },
      { name: "Donnafugata Sherazade DOC Nero d’Avola", price: "160", description: "Italy" },
      { name: "Amarone della Valpolicella Campagnola", price: "285", description: "Italy" },
      { name: "Ruffino Modus Toscana IGT Merlot", price: "315", description: "Italy" },
      { name: "Le Difese Tenuta San Guido", price: "345", description: "Italy" },
      { name: "Luce Brunello di Montalcino", price: "1050", description: "Italy" },
      { name: "Penfolds Koonunga Hill Shiraz", price: "155", description: "Australia" },
    ],
  },
  sparklingWine: {
    id: "sparkling-wine",
    name: "Sparkling Wine",
    items: [
      { name: "Chandon Brut", price: "28/148" },
      { name: "Astoria Sushi", price: "140" },
      { name: "Mionetto Prosecco Spumante Prestige", price: "140" },
      { name: "Prosecco Tenuta Arcanes Brut", price: "145" },
      { name: "Freixenet Cordon Negro", price: "145" },
      { name: "Astoria Prosecco Lounge Cuvée", price: "155" },
      { name: "Freixenet Prosecco DOC Extra Dry", price: "155" },
      { name: "Freixenet Italian Rosé Extra Dry", price: "155" },
    ],
  },
  champagne: {
    id: "champagne",
    name: "Champagne",
    items: [
      { name: "Moët & Chandon Brut", price: "380" },
      { name: "Taittinger Brut", price: "380" },
      { name: "Moët & Chandon Rosé", price: "420" },
      { name: "Veuve Clicquot Brut", price: "420" },
      { name: "Ruinart Brut", price: "600" },
      { name: "Ruinart Rosé", price: "650" },
      { name: "Dom Pérignon", price: "1350" },
    ],
  },
  signatureShisha: {
    id: "signature-shishas",
    name: "Xüsusi Qəlyanlar",
    items: [
      { name: "Qış Yuxusu (Winter Dream)", price: "110" },
      { name: "Manqo–Marakuya Smuzi (Mango–Passionfruit Smoothie)", price: "130" },
      { name: "Marşmello (Marshmallow)", price: "180" },
    ],
  },
  premiumTobacco: {
    id: "premium-tobacco",
    name: "Premium Tütün",
    items: [
      { name: "Fincan (Virginia + Burley)", price: "60" },
      { name: "Fincan (Siqar yarpağı, zəngin nikotin)", price: "80" },
      { name: "Seçimə görə meyvələr: qreyfrut, nar (Göyçay), limon (Astara), ananas" },
    ],
  },
  fruitShisha: {
    id: "fruit-shisha",
    name: "Meyvəli Qəlyan",
    items: [
      {
        name: "Meyvəli qəlyan (seçimlə)",
        description: "meyvə qabında servis, meyvələrdən biri ilə (qreyfrut, nar, limon, ananas)",
      },
      { name: "Meyvələr (Virginia + Burley)", price: "80" },
    ],
  },
};

const mainCategories: MainCategory[] = [
  {
    id: "starters",
    name: "Başlanğıclar",
    sections: [sections.coldAppetizers, sections.soups, sections.hotAppetizers],
  },
  {
    id: "mains",
    name: "Əsas Yeməklər",
    sections: [
      sections.hotDishes,
      sections.panDishes,
      sections.doughDishes,
      sections.pilafs,
      sections.kebabs,
      sections.winterMenu,
      sections.desserts,
    ],
  },
  {
    id: "non-alcoholic",
    name: "Alkoqolsuz İçkilər",
    sections: [sections.softDrinks, sections.lemonade, sections.tea, sections.coffee],
  },
  {
    id: "alcoholic",
    name: "Alkoqollu İçkilər",
    sections: [
      sections.beer,
      sections.cocktail,
      sections.infusion,
      sections.liqueur,
      sections.raki,
      sections.rum,
      sections.whisky,
      sections.vodka,
      sections.tequila,
      sections.grappa,
      sections.gin,
      sections.brandy,
      sections.whiteWine,
      sections.roseWine,
      sections.redWine,
      sections.sparklingWine,
      sections.champagne,
    ],
  },
  {
    id: "shisha",
    name: "Qəlyan",
    sections: [sections.signatureShisha, sections.premiumTobacco, sections.fruitShisha],
  },
];

const serviceNote = "Hesaba 10% xidmət haqqı əlavə olunur.";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>(mainCategories[0]?.id ?? "");
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const matchesTerm = (item: MenuItem, term: string) => {
    const value = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(value) ||
      (item.description ? item.description.toLowerCase().includes(value) : false)
    );
  };

  const filterSections = (sectionsToFilter: MenuSection[]) => {
    if (!searchTerm.trim()) return sectionsToFilter;
    const term = searchTerm.trim().toLowerCase();

    return sectionsToFilter
      .map((section) => {
        if (section.columns) {
          const filteredColumns = section.columns
            .map((col) => col.filter((item) => matchesTerm(item, term)))
            .filter((col) => col.length > 0);

          return filteredColumns.length
            ? { ...section, columns: filteredColumns }
            : null;
        }

        const filteredItems = section.items?.filter((item) => matchesTerm(item, term)) ?? [];
        return filteredItems.length ? { ...section, items: filteredItems } : null;
      })
      .filter(Boolean) as MenuSection[];
  };

  const renderItemRow = (item: MenuItem, delay: number) => (
    <div
      key={`${item.name}-${delay}`}
      className={`py-6 border-b border-primary/20 last:border-b-0 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <div className="flex-1">
          <h4 className="text-heading-sm text-foreground mb-1">{item.name}</h4>
          {item.description && (
            <p className="text-body text-muted-foreground">{item.description}</p>
          )}
        </div>
        {item.price && (
          <span className="text-heading-sm text-primary whitespace-nowrap">
            {item.price}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-dark-surface pt-32 pb-12">
        <div
          className={`container-narrow text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader
            subtitle="Menyumuz"
            title="Kulinariya Sənəti"
            description="Ənənəvi dadların müasir interpretasiyası"
            light
          />
        </div>
      </section>

      {/* Search */}
      <div className="bg-background border-b border-primary/10">
        <div className="container-wide py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-body-sm text-muted-foreground uppercase tracking-[0.25em]">Axtarış</p>
            <p className="text-body text-muted-foreground">Seçdiyiniz yeməyi tez tapın.</p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Məs: qutab, plov, espresso..."
                className="w-full rounded-full border border-primary/30 bg-background px-10 py-3 text-body focus:outline-none focus:ring-2 focus:ring-primary/60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container-wide py-4 overflow-x-auto no-scrollbar">
          <ul className="flex items-center justify-center gap-4 md:gap-6 min-w-max">
            {mainCategories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => scrollToCategory(category.id)}
                  className={`text-body-sm px-5 py-3 rounded-full border border-primary/30 transition-colors duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-primary/15 text-primary border-primary"
                      : "text-foreground hover:text-primary hover:border-primary/60"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Menu Content */}
      <section ref={sectionRef} className="bg-background section-padding">
        <div className="container-narrow">
          {mainCategories.map((category, categoryIndex) => {
            const filteredSections = filterSections(category.sections);

            return (
              <div key={category.id} id={category.id} className="mb-20 last:mb-0">
                <h3 className="text-heading-md text-foreground mb-10 text-center">
                  {category.name}
                </h3>
                <div className="gold-separator mb-10" />

                {filteredSections.length === 0 ? (
                  <p className="text-center text-body text-muted-foreground">
                    Axtarışa uyğun nəticə tapılmadı.
                  </p>
                ) : (
                  filteredSections.map((section, sectionIndex) => (
                    <div key={section.id} className="mb-14 last:mb-0">
                      <h4 className="text-heading-sm text-primary mb-6 text-center md:text-left uppercase tracking-[0.2em]">
                        {section.name}
                      </h4>

                      {section.columns ? (
                        <div className="grid md:grid-cols-2 gap-12">
                          {section.columns.map((columnItems, columnIndex) => (
                            <div key={`${section.id}-col-${columnIndex}`} className="space-y-0">
                              {columnItems.map((item, itemIndex) =>
                                renderItemRow(
                                  item,
                                  categoryIndex * 150 + sectionIndex * 80 + columnIndex * 40 + itemIndex * 40
                                )
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-0">
                          {section.items?.map((item, itemIndex) =>
                            renderItemRow(item, categoryIndex * 150 + sectionIndex * 80 + itemIndex * 40)
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-16 text-center text-body text-muted-foreground">
          <span className="font-heading text-body-sm tracking-[0.25em] uppercase text-primary block mb-3">Qeyd</span>
          {serviceNote}
        </p>
      </section>
    </Layout>
  );
};

export default Menu;
