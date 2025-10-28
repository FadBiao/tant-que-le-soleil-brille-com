import podcastCover from "@/assets/podcast-cover.png";

export interface Podcast {
  id: string;
  title: string;
  spotifyUrl: string;
  image: string;
  themes: string[];
}

export const allPodcasts: Podcast[] = [
  // Relations
  { id: "3p5AhvpkeU7MaIJXAxmrN7", title: "Savoir poser ses limites", spotifyUrl: "https://open.spotify.com/episode/3p5AhvpkeU7MaIJXAxmrN7?si=NI7dCLapQJSZOLSkmpYOag", image: podcastCover, themes: ["Relations"] },
  { id: "2eU3gZhHeznGye5xA7WSuu", title: "Ton ex t'a appris des choses", spotifyUrl: "https://open.spotify.com/episode/2eU3gZhHeznGye5xA7WSuu?si=-1UxRNbBTACjXn88Lk2r0Q", image: podcastCover, themes: ["Relations"] },
  { id: "235wfGeVykk9oZfgdJyDZa", title: "Avance avec ou sans eux", spotifyUrl: "https://open.spotify.com/episode/235wfGeVykk9oZfgdJyDZa?si=gNGN1e7hRveLeP5eL0iLlw", image: podcastCover, themes: ["Relations"] },
  { id: "7MCuQOBrGWEuFnuW3hXfcH", title: "Savoir dire stop !", spotifyUrl: "https://open.spotify.com/episode/7MCuQOBrGWEuFnuW3hXfcH?si=zmiguAT5T6-eNaayj-PmBQ", image: podcastCover, themes: ["Relations"] },
  { id: "2xQMiaponoYLEn7CEbmqdN", title: "Entoure toi de gentils !", spotifyUrl: "https://open.spotify.com/episode/2xQMiaponoYLEn7CEbmqdN?si=m4IK5MeKQK6SXNQr7FvgCQ", image: podcastCover, themes: ["Relations"] },
  { id: "5Wguy4Pm6bDwHstkLEhdCY", title: "L'importance de la vulnerabilité", spotifyUrl: "https://open.spotify.com/episode/5Wguy4Pm6bDwHstkLEhdCY?si=hsc8SGWJR3qMRofbov5A5A", image: podcastCover, themes: ["Relations"] },
  { id: "6paCEtSwjIKVXbwF14QWN0", title: "C'est qui l'Amour de ta vie ?", spotifyUrl: "https://open.spotify.com/episode/6paCEtSwjIKVXbwF14QWN0?si=k74HPFYgRAeDZDPVxnPTYw", image: podcastCover, themes: ["Relations"] },
  { id: "5W9T0srYlShLAAB5jWNg3h", title: "Remettre les gens à leur place", spotifyUrl: "https://open.spotify.com/episode/5W9T0srYlShLAAB5jWNg3h?si=TCJ0HlhrSAmlMIRa_YO8YA", image: podcastCover, themes: ["Relations"] },
  { id: "26cWpRWQXyMZ14rj7qePSI", title: "Comment trouver une relation saine ? (Coach Chloé Merckaert)", spotifyUrl: "https://open.spotify.com/episode/26cWpRWQXyMZ14rj7qePSI?si=47vhKc1zSHy6jd85ZRjXMQ", image: podcastCover, themes: ["Relations"] },
  { id: "3BCwm3r5g7By64ZjaJBXyB", title: "Une technique de manipulation", spotifyUrl: "https://open.spotify.com/episode/3BCwm3r5g7By64ZjaJBXyB?si=kHAc_dlxSnKSNRRU4MiJhg", image: podcastCover, themes: ["Relations"] },
  { id: "00BupaR10MTW131FO7wRsb", title: "Ils reviennent tous ?", spotifyUrl: "https://open.spotify.com/episode/00BupaR10MTW131FO7wRsb?si=2nt1UriMTTi7SXxiATeKYQ", image: podcastCover, themes: ["Relations"] },
  { id: "6jQhVdLq1jhfnwapZF5Kg8", title: "Guérir c'est dur", spotifyUrl: "https://open.spotify.com/episode/6jQhVdLq1jhfnwapZF5Kg8?si=mMvGc-LqSI2Sk7YVRXvcNQ", image: podcastCover, themes: ["Relations", "Santé", "Bonheur"] },
  { id: "2lywFkVGowg8nBnK0NcSBO", title: "Tu t'es enfin choisi !", spotifyUrl: "https://open.spotify.com/episode/2lywFkVGowg8nBnK0NcSBO?si=L5DDPiANSeitityr467TZA", image: podcastCover, themes: ["Relations", "Confiance en soi", "Santé", "Bonheur"] },
  { id: "0cUwe0Wmm80YCBd4OtZ01L", title: "Tu tolères trop de choses", spotifyUrl: "https://open.spotify.com/episode/0cUwe0Wmm80YCBd4OtZ01L?si=XQnsHCsySlSFn2pGOyRoFg", image: podcastCover, themes: ["Relations"] },
  { id: "27no0X7IlFv1YwqieRkXsb", title: "Ne te laisse pas faire", spotifyUrl: "https://open.spotify.com/episode/27no0X7IlFv1YwqieRkXsb?si=GaDw1CgBTnSlXYN7fNGzuw", image: podcastCover, themes: ["Relations"] },
  { id: "1FjmcyMWe631QjZNcL7C46", title: "Tu ne leur parleras plus jamais", spotifyUrl: "https://open.spotify.com/episode/1FjmcyMWe631QjZNcL7C46?si=fISsg62_QwWRyKohJQyoUQ", image: podcastCover, themes: ["Relations"] },
  { id: "7dkEvEoIC7lnUztR2hycTE", title: "Juste avance, n'oublie pas", spotifyUrl: "https://open.spotify.com/episode/7dkEvEoIC7lnUztR2hycTE?si=Fov02Vr5S5OdZCYG4TaItA", image: podcastCover, themes: ["Relations"] },
  { id: "0ZEovMfZzSbOdeTbOVRSgh", title: "La pression du mariage", spotifyUrl: "https://open.spotify.com/episode/0ZEovMfZzSbOdeTbOVRSgh?si=QZmztWPCQhma-ijrNSPOgA", image: podcastCover, themes: ["Relations"] },
  { id: "7BVWfoiuWMPew6gDPntEFg", title: "Ton pire cauchemar", spotifyUrl: "https://open.spotify.com/episode/7BVWfoiuWMPew6gDPntEFg?si=hBbbG3m1RXCOcFmh2VnBTw", image: podcastCover, themes: ["Relations", "Confiance en soi", "Motivation"] },
  { id: "6GQQMWvXx3z03rK3B7R5lK", title: "Si tu t'es fait quitter...", spotifyUrl: "https://open.spotify.com/episode/6GQQMWvXx3z03rK3B7R5lK?si=cBkDyrwORpyKKtzp2m1Z8g", image: podcastCover, themes: ["Relations"] },
  { id: "6dwMI8BlxRJMkF4IWZtxLo", title: "Les adieux...", spotifyUrl: "https://open.spotify.com/episode/6dwMI8BlxRJMkF4IWZtxLo?si=W2zyunvATOSEmZ3U98-DRg", image: podcastCover, themes: ["Relations"] },
  { id: "5smtravXSZzGB9HSLq0eMp", title: "Où va ton énergie ?", spotifyUrl: "https://open.spotify.com/episode/5smtravXSZzGB9HSLq0eMp?si=0Akg7a94QHmNk4Rt54BsaA", image: podcastCover, themes: ["Relations", "Santé", "Bonheur"] },
  { id: "1ulQsnw0q6xSZJoviXP42o", title: "Être jaloux (explication de la jalousie)", spotifyUrl: "https://open.spotify.com/episode/1ulQsnw0q6xSZJoviXP42o?si=X2h1-fBfTP6rlVuqtcDr7Q", image: podcastCover, themes: ["Relations"] },
  { id: "4Fdrt5HKyuDceqhebjDouV", title: "Laisse les te perdre", spotifyUrl: "https://open.spotify.com/episode/4Fdrt5HKyuDceqhebjDouV?si=5n4gzWYmTbKyXg6Z4bIyLg", image: podcastCover, themes: ["Relations"] },
  { id: "48lRVphzXEnQkjdQoDAVIq", title: "Tu n'as rien à prouver", spotifyUrl: "https://open.spotify.com/episode/48lRVphzXEnQkjdQoDAVIq?si=0K-EfeEOTN2GRx-3n6loIQ", image: podcastCover, themes: ["Relations", "Confiance en soi", "Bonheur"] },
  { id: "2gVPSco6iYfqwXyX8LONc3", title: "Seul(e) entouré(e)", spotifyUrl: "https://open.spotify.com/episode/2gVPSco6iYfqwXyX8LONc3?si=goflBr0fQ9eT3w8XqCJrWQ", image: podcastCover, themes: ["Relations"] },
  { id: "7pxpuUellaAtihRV6tD1G7", title: "La douleur amoureuse (avec Skeap)", spotifyUrl: "https://open.spotify.com/episode/7pxpuUellaAtihRV6tD1G7?si=bydO_YkYTBK4EtnTc13PyA", image: podcastCover, themes: ["Relations"] },
  { id: "1SfrBxmmtpVlXL4waWjcCD", title: "Il lui a pris sa première fois (Ophélie)", spotifyUrl: "https://open.spotify.com/episode/1SfrBxmmtpVlXL4waWjcCD?si=ieYWpuH0Rwy6K-8o8wIe9Q", image: podcastCover, themes: ["Relations"] },
  { id: "1B6JBPj0j8XAJwNCexC93S", title: "L'infidélité dans le couple", spotifyUrl: "https://open.spotify.com/episode/1B6JBPj0j8XAJwNCexC93S?si=v6KDPPWRTKiGhU3cuZ_cQA", image: podcastCover, themes: ["Relations"] },
  { id: "6Ewweel1A6vI37ykuP5wLd", title: "L'histoire de Margot (tromperie)", spotifyUrl: "https://open.spotify.com/episode/6Ewweel1A6vI37ykuP5wLd?si=DS_O5SruTUy1giZnXC74jg", image: podcastCover, themes: ["Relations"] },
  { id: "0ZQmJwDUdE69hCKWyISnkD", title: "La bienveillance toxique", spotifyUrl: "https://open.spotify.com/episode/0ZQmJwDUdE69hCKWyISnkD?si=XgPwfPEJSjSdbUFvDu_y9g", image: podcastCover, themes: ["Relations"] },
  { id: "26JsXuMOrekRbf7x7E2gsN", title: "Ils savent très bien ce qu'ils ont fait", spotifyUrl: "https://open.spotify.com/episode/26JsXuMOrekRbf7x7E2gsN?si=D9rUWXzAQxCjpD4GueJgRw", image: podcastCover, themes: ["Relations"] },
  { id: "19MfZX3L1nOB7M1YHDcFgi", title: "Remercier nos proches", spotifyUrl: "https://open.spotify.com/episode/19MfZX3L1nOB7M1YHDcFgi?si=TZHXqCoeRwGu1l0Gk86Piw", image: podcastCover, themes: ["Relations"] },
  { id: "53zUjlYFQm5qyxCIKh2Q4y", title: "Je t'aime, mais...", spotifyUrl: "https://open.spotify.com/episode/53zUjlYFQm5qyxCIKh2Q4y?si=Ro1JpZkWSYK5OjwuSgvN7A", image: podcastCover, themes: ["Relations"] },

  // Confiance en soi
  { id: "47UCKWR9u3n3EIB6N1R6zQ", title: "Respecte toi", spotifyUrl: "https://open.spotify.com/episode/47UCKWR9u3n3EIB6N1R6zQ?si=gxZ_M_DkR7mABPR-71g5Rw", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "5Z3QhXLuVsKCdKHLg2BoGw", title: "Regarde toi en face", spotifyUrl: "https://open.spotify.com/episode/5Z3QhXLuVsKCdKHLg2BoGw?si=phmpCyTHSRK2KK_XmeK3rQ", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "0DoLksKbqbpnUXx1NlECI4", title: "Les conséquences de tes actes", spotifyUrl: "https://open.spotify.com/episode/0DoLksKbqbpnUXx1NlECI4?si=I3GA56UIQkmyHfT5fUOehA", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "28crIgVRma54djr8a5gqhD", title: "Le pouvoir de la femme", spotifyUrl: "https://open.spotify.com/episode/28crIgVRma54djr8a5gqhD?si=h5XwcGMHT2SkSEtHG6Id3A", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "6wzX8SMlh89WPChfYovfdv", title: "L'auto-sabotage", spotifyUrl: "https://open.spotify.com/episode/6wzX8SMlh89WPChfYovfdv?si=PfrRRvgRSbWdKRLaPTSprw", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "5cOvZFqqoMZdvL6X9wDNkb", title: "La peur est mentale", spotifyUrl: "https://open.spotify.com/episode/5cOvZFqqoMZdvL6X9wDNkb?si=2XlS8JmORl6oS8sQV1aCkw", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "2ry3tp767rfWVuGAQazhyh", title: "Les pensées négatives", spotifyUrl: "https://open.spotify.com/episode/2ry3tp767rfWVuGAQazhyh?si=VDqilcyNSE2jtjz3Ildi2A", image: podcastCover, themes: ["Confiance en soi", "Santé"] },
  { id: "0nXswbS3EVjqDsLBCZ3Nup", title: "Savoir dire OUI !", spotifyUrl: "https://open.spotify.com/episode/0nXswbS3EVjqDsLBCZ3Nup?si=4m7rPDOYQmKoHu5e53llBg", image: podcastCover, themes: ["Confiance en soi", "Bonheur", "Motivation"] },
  { id: "4wpWiCgXv3DRK8pZyGWgP9", title: "Tu n'as pas râté ta vie", spotifyUrl: "https://open.spotify.com/episode/4wpWiCgXv3DRK8pZyGWgP9?si=dOxH0Xc2TwmCGR5azLgZ1A", image: podcastCover, themes: ["Confiance en soi", "Motivation"] },
  { id: "5R4HwSsu8Tc7vhTstbIEk2", title: "Sois juste toi. C'est suffisant.", spotifyUrl: "https://open.spotify.com/episode/5R4HwSsu8Tc7vhTstbIEk2?si=xPt9l1FoRkGUcTTK4eI4vw", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "7eGrmJWL2AVS1VqCob6VCh", title: "Voyager seul.e (avec Lou)", spotifyUrl: "https://open.spotify.com/episode/7eGrmJWL2AVS1VqCob6VCh?si=vT3K0kPqTSmH6T3nOdv6kA", image: podcastCover, themes: ["Confiance en soi", "Bonheur"] },
  { id: "0f4hjGxfpIRAaeMdSvO2na", title: "Sors du silence", spotifyUrl: "https://open.spotify.com/episode/0f4hjGxfpIRAaeMdSvO2na?si=fecVQvekTPepSYR5haE0jQ", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "6Qjo6MWQJRBgOezzoK2NCf", title: "Tu as de la chance", spotifyUrl: "https://open.spotify.com/episode/6Qjo6MWQJRBgOezzoK2NCf?si=rsLvMbgjR9uRLaATl3Dcbw", image: podcastCover, themes: ["Confiance en soi", "Bonheur", "Motivation"] },
  { id: "3jvanYhH8TgXq8c4f8003Q", title: "Ça reste entre nous", spotifyUrl: "https://open.spotify.com/episode/3jvanYhH8TgXq8c4f8003Q?si=9bLOY9r1T1iY8ezTvBH9Dg", image: podcastCover, themes: ["Confiance en soi", "Bonheur", "Motivation"] },
  { id: "40PPw58GEhyOB4Xef4k0lb", title: "Fais-le pour toi", spotifyUrl: "https://open.spotify.com/episode/40PPw58GEhyOB4Xef4k0lb?si=cOBoud94QDGxMBUPI8wKkQ", image: podcastCover, themes: ["Confiance en soi", "Motivation"] },
  { id: "4VA16O5AjQVQe17HXSSrQr", title: "Les décisions qui font peur (courage)", spotifyUrl: "https://open.spotify.com/episode/4VA16O5AjQVQe17HXSSrQr?si=3-funjdaTsKg1VbLhFVQaQ", image: podcastCover, themes: ["Confiance en soi", "Motivation"] },
  { id: "3rjw4CmMnSwEHrYDeFDqwZ", title: "Ne désespere pas (relève toi)", spotifyUrl: "https://open.spotify.com/episode/3rjw4CmMnSwEHrYDeFDqwZ?si=mpRiqIh-SHy3UqtTtPDTTA", image: podcastCover, themes: ["Confiance en soi", "Motivation"] },
  { id: "0HU6cVP6qww8SDhsu6TPzD", title: "Fais ton état des lieux (par amour pour toi)", spotifyUrl: "https://open.spotify.com/episode/0HU6cVP6qww8SDhsu6TPzD?si=sjxGMctqSLWavK7MXTOyBQ", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "7KwFU6lMHlRQa63WOkWkUt", title: "16 min pour t'inspirer", spotifyUrl: "https://open.spotify.com/episode/7KwFU6lMHlRQa63WOkWkUt?si=dGs_-3G0Sm2U4Nl1WgWVRg", image: podcastCover, themes: ["Confiance en soi", "Bonheur", "Motivation"] },
  { id: "7fvc1nlpql7kytAoCCsqNR", title: "Se sentir nul (\"je suis pas à la hauteur\")", spotifyUrl: "https://open.spotify.com/episode/7fvc1nlpql7kytAoCCsqNR?si=JwWnEqkPSoy44uroY84AMA", image: podcastCover, themes: ["Confiance en soi"] },
  { id: "01BdLl4gzJJGH0o1CqecR5", title: "il/elle ne t'aime pas (réveille toi)", spotifyUrl: "https://open.spotify.com/episode/01BdLl4gzJJGH0o1CqecR5?si=blCGTvJeTR-6Dq7dCt08mw", image: podcastCover, themes: ["Confiance en soi"] },

  // Santé
  { id: "2XefuKwFPqAA9DzppLAH72", title: "Ils s'affament (régime)", spotifyUrl: "https://open.spotify.com/episode/2XefuKwFPqAA9DzppLAH72?si=gz0WEXfpRNORrJE4uGzINQ", image: podcastCover, themes: ["Santé"] },
  { id: "6FR3OUZZSptRyUdTafDCgq", title: "Si tu te sens vide...", spotifyUrl: "https://open.spotify.com/episode/6FR3OUZZSptRyUdTafDCgq?si=JEYx2BCsTd-tScEACk9o2A", image: podcastCover, themes: ["Santé", "Motivation"] },
  { id: "6rt6F3Bjnu6KvbzwIzDtB7", title: "Cet épisode est pour ton bien", spotifyUrl: "https://open.spotify.com/episode/6rt6F3Bjnu6KvbzwIzDtB7?si=XA2t3F-rRaawjCf1yLeTdA", image: podcastCover, themes: ["Santé", "Bonheur", "Motivation"] },
  { id: "0BP11gJ8ulKqfVIjKm4qcG", title: "La santé mentale au travail", spotifyUrl: "https://open.spotify.com/episode/0BP11gJ8ulKqfVIjKm4qcG?si=q7MyRczpTXioOJPs8WD0Pg", image: podcastCover, themes: ["Santé"] },
  { id: "50daTshX31YQGyWOVAr5Tx", title: "S'ancrer dans le moment présent", spotifyUrl: "https://open.spotify.com/episode/50daTshX31YQGyWOVAr5Tx?si=blqumV3vRIiVTvWCW42wkA", image: podcastCover, themes: ["Santé", "Bonheur"] },
  { id: "3Xa0ihlBCZJzEwq0S3efPU", title: "La productivité toxique", spotifyUrl: "https://open.spotify.com/episode/3Xa0ihlBCZJzEwq0S3efPU?si=2um6lhGxS7mtecVaGR4WXg", image: podcastCover, themes: ["Santé"] },

  // Bonheur
  { id: "2jk66V60ZTYC171X8VUyAN", title: "Prépare toi au bonheur !", spotifyUrl: "https://open.spotify.com/episode/2jk66V60ZTYC171X8VUyAN?si=aLTrNHjdSe-e4R2UTRF4lg", image: podcastCover, themes: ["Bonheur"] },
  { id: "1Zgmp7d8zrQ7fNJEB13qvf", title: "Choisir ou subir", spotifyUrl: "https://open.spotify.com/episode/1Zgmp7d8zrQ7fNJEB13qvf?si=MeDXqi1-TJWPSEe0-V_mJA", image: podcastCover, themes: ["Bonheur"] },
  { id: "4P9tdYWlhbBPk5iu3V4YzW", title: "Tu as des regrets ?", spotifyUrl: "https://open.spotify.com/episode/4P9tdYWlhbBPk5iu3V4YzW?si=Hqj8DMS6QquGpFQmKHutIA", image: podcastCover, themes: ["Bonheur"] },
  { id: "5vpr2X66PyFU5hDZ8fxhK3", title: "Va provoquer ta vie !", spotifyUrl: "https://open.spotify.com/episode/5vpr2X66PyFU5hDZ8fxhK3?si=0SUmlpZrQ3et1xVajxm9UQ", image: podcastCover, themes: ["Bonheur", "Motivation"] },
  { id: "5Plgrids6dSsr3Y64KroQh", title: "Peu pour être heureux", spotifyUrl: "https://open.spotify.com/episode/5Plgrids6dSsr3Y64KroQh?si=dfLxGbj3TLSZNuuGpAIT-A", image: podcastCover, themes: ["Bonheur"] },
  { id: "3PQoUSxFAR05f1HdcexVhO", title: "Si tu te sens seul.e", spotifyUrl: "https://open.spotify.com/episode/3PQoUSxFAR05f1HdcexVhO?si=f_BdSFcWTFuTQEvvfVIoVw", image: podcastCover, themes: ["Bonheur"] },
  { id: "5qsE9uSTALAn3PIwrYptu8", title: "Tout arrive pour une raison", spotifyUrl: "https://open.spotify.com/episode/5qsE9uSTALAn3PIwrYptu8?si=QXEsrK-JQZWGvuGieJPyZQ", image: podcastCover, themes: ["Bonheur"] },
  { id: "2xnRUqe5BqVrTbVb5MagRT", title: "Né dévoile pas tout", spotifyUrl: "https://open.spotify.com/episode/2xnRUqe5BqVrTbVb5MagRT?si=6J6xnEeKQdG6_lZrhU6Q7Q", image: podcastCover, themes: ["Bonheur"] },
  { id: "3NXoF6Xb0TVloySHA7HLwa", title: "Suis ta vision (avec Keem)", spotifyUrl: "https://open.spotify.com/episode/3NXoF6Xb0TVloySHA7HLwa?si=w3uivGH9RJaGt7NcsP1s1w", image: podcastCover, themes: ["Bonheur", "Motivation"] },
  { id: "47SeqH3HpshiuJKagWbtMk", title: "Prends du plaisir à vivre (vis pour toi)", spotifyUrl: "https://open.spotify.com/episode/47SeqH3HpshiuJKagWbtMk?si=E04edJbQT2e2xMZZLgvCbA", image: podcastCover, themes: ["Bonheur"] },
  { id: "2LjTvzSTpBuAf35cTJ7ThU", title: "Ne censure pas ton coeur", spotifyUrl: "https://open.spotify.com/episode/2LjTvzSTpBuAf35cTJ7ThU?si=wrjrfZfJRaWnZDYVSKO7GA", image: podcastCover, themes: ["Bonheur"] },

  // Motivation
  { id: "39dJTy86mzcsEsSVBYMT5v", title: "10 min pour t'inspirer", spotifyUrl: "https://open.spotify.com/episode/39dJTy86mzcsEsSVBYMT5v?si=H3xSv9s2RcOyjV5uOjfk8g", image: podcastCover, themes: ["Motivation"] },
  { id: "5ROtoFgPQiDxt15WiA5LBp", title: "Passe à l'action 2", spotifyUrl: "https://open.spotify.com/episode/5ROtoFgPQiDxt15WiA5LBp?si=pPSTTm2fRaW4QghuYA3gbQ", image: podcastCover, themes: ["Motivation"] },
  { id: "7BKfkFIPmwcgtlupJTTcqz", title: "59 sec pour t'inspirer", spotifyUrl: "https://open.spotify.com/episode/7BKfkFIPmwcgtlupJTTcqz?si=uXMzUcnAQeeUyFXcRyS2mg", image: podcastCover, themes: ["Motivation"] },
  { id: "5ufYGJbBrP9CFepd3mOQNw", title: "Passe à l'action", spotifyUrl: "https://open.spotify.com/episode/5ufYGJbBrP9CFepd3mOQNw?si=gUHfdvcVT1O2TP4b20EsHw", image: podcastCover, themes: ["Motivation"] },
  { id: "7MXpSi7as83NO8759R7xkx", title: "Personne ne se fait tout seul", spotifyUrl: "https://open.spotify.com/episode/7MXpSi7as83NO8759R7xkx?si=VAIfp3VETGay465DA4UOQA", image: podcastCover, themes: ["Motivation"] },
  { id: "21R0FUqvBzlJTPHhQiBxlX", title: "Les vertus du travail", spotifyUrl: "https://open.spotify.com/episode/21R0FUqvBzlJTPHhQiBxlX?si=uiDOUd7aSeybdKQb2cXPig", image: podcastCover, themes: ["Motivation"] },
  { id: "3C3eEX8KNYa7NOHr15jjmi", title: "C'est rien juste relève toi", spotifyUrl: "https://open.spotify.com/episode/3C3eEX8KNYa7NOHr15jjmi?si=WFyWzvuySRWJNaUFamx9Cg", image: podcastCover, themes: ["Motivation"] },
  { id: "1Yzm9dz4Ogh5k8r7q25HsG", title: "5 min pour t'inspirer", spotifyUrl: "https://open.spotify.com/episode/1Yzm9dz4Ogh5k8r7q25HsG?si=rk3DW3t0RyCD6GOSBomczw", image: podcastCover, themes: ["Motivation"] },
  { id: "0uMWr0lL3XVKCoLhq6yvhE", title: "Écoute ça si t'es à bout", spotifyUrl: "https://open.spotify.com/episode/0uMWr0lL3XVKCoLhq6yvhE?si=ydDXXgBjQ1612CAxVj7pDw", image: podcastCover, themes: ["Motivation"] },
  { id: "7DSoWa1gCE1PrWOanN4DYC", title: "Le bien déguisé en mal", spotifyUrl: "https://open.spotify.com/episode/7DSoWa1gCE1PrWOanN4DYC?si=5rw6Xoj_TOS89AQ_pXUngw", image: podcastCover, themes: ["Motivation"] },
  { id: "0ygqOtgASRRrdGaFjgWHyp", title: "59 sec pour t'inspirer", spotifyUrl: "https://open.spotify.com/episode/0ygqOtgASRRrdGaFjgWHyp?si=MAfapee7TG6WjMvgJJdsSQ", image: podcastCover, themes: ["Motivation"] },
  { id: "7cc9DsyC9cGLMn42lNM4pH", title: "Commence ou recommence", spotifyUrl: "https://open.spotify.com/episode/7cc9DsyC9cGLMn42lNM4pH?si=RxCP3Im3T0SeU7jv5Tb5Rg", image: podcastCover, themes: ["Motivation"] },
  { id: "7b2PWpCLTW5D9Bges9XQl0", title: "Gère tes sous ! (avec Marc Maziere)", spotifyUrl: "https://open.spotify.com/episode/7b2PWpCLTW5D9Bges9XQl0?si=4C6n4FrTRB-3htKWIoYffg", image: podcastCover, themes: ["Motivation"] },
  { id: "1vTD1DFWVWuheCoEkgldaN", title: "La vie c'est l'incertitude, la mort c'est la certitude", spotifyUrl: "https://open.spotify.com/episode/1vTD1DFWVWuheCoEkgldaN?si=y6CrKqNxRE6cLjHq3ojuBw", image: podcastCover, themes: ["Motivation"] },
  { id: "4hG9ZRDYSxksoFixZ9mnOy", title: "Ces pensées ne sont pas les tiennes", spotifyUrl: "https://open.spotify.com/episode/4hG9ZRDYSxksoFixZ9mnOy?si=tU7xUmy3QNmHVm7KlHgJeQ", image: podcastCover, themes: ["Motivation"] },
  { id: "4Wmi4snV8mpYp2NUBI5VsS", title: "Parfois, juste FAIS RIEN (repose toi!)", spotifyUrl: "https://open.spotify.com/episode/4Wmi4snV8mpYp2NUBI5VsS?si=IdxI0f5sQwiuoC_3sXnWhQ", image: podcastCover, themes: ["Motivation"] },
  { id: "3DjmHdG5n5ar1R3O56eLuu", title: "Si tu sais pas quoi faire de ta vie", spotifyUrl: "https://open.spotify.com/episode/3DjmHdG5n5ar1R3O56eLuu?si=BTpDzBeUQeiCl31lTPMz_Q", image: podcastCover, themes: ["Motivation"] },
  { id: "4ZNZmX47Z6BGVJUN63MgnV", title: "Échouer c'est réussir (t'as bien lu)", spotifyUrl: "https://open.spotify.com/episode/4ZNZmX47Z6BGVJUN63MgnV?si=8GGoFJWtSVSupinf6TSAQg", image: podcastCover, themes: ["Motivation"] },
];

export const themes = ["Tous les topics", "Relations", "Confiance en soi", "Santé", "Bonheur", "Motivation"];
