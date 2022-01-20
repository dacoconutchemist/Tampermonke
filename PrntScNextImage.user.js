// ==UserScript==
// @name         Next Lightshot Page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  go to next prnt.sc image
// @author       dacoconutchemist
// @match        https://prnt.sc/*
// @icon         https://www.google.com/s2/favicons?domain=prnt.sc
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @require      https://raw.githubusercontent.com/dacoconutchemist/Tampermonke/main/-/-.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

function isNotFound(src){ // checks whether the image is removed or not found
    return ["data:image/jpeg;base64,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",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaYAAABsCAYAAAAhdRZlAAAAAXNSR0IArs4c6QAAIABJREFUeF7tnXXUVcUWwAcVW7EDwW5FFEXFTgTxqWArNibqszuwEEVRsECe2IXdKHaBCArYHdii4rOTt35nvcOaO3fOmTlx752Pb++1+IPvzpnYs2fvPbumxdSpU6eqQKFFixZVMwt4uoFiUaYlGBAM1BoDwqvKxXALEUzlIlR6EwwIBpofBkQwlbvnXEkafmNKugXJZpe72dKbYEAwUBsMCK8qF68imMrFp/QmGBAMNEMMiGCq3vQiOBHB1AwPkSxZMCAYKBcDRZhwuTMJp7ciOBHBFM4+ykwEA4KBJoqBIky4iS7ZOe0iOMkd/FBkUOeK/t+gHmP4zkXaCQYEA4KBJAwIryrZlJc3Kq8eG1GPMeSoCQYEA4KBohgQXiWCqSgNyfeCAcGAYKBUDIhgEsFUKkFJZ4IBwYBgoCgGRDCJYCpKQ/K9YEAwIBgoFQMimEQwVWDgzz//VPfee6964IEH1Msvv6w++eQT9fPPP6tWrVqpBRdcULVr10517dpVde/eXc0zzzylEmPc2euvv67uv/9+NWrUKPXOO++ozz//XP3yyy9qjjnmiOaw6KKLqg022CCaR6dOndRMM81Uk3nk6fTHH39U99xzTzT3V155RX322Wfqhx9+UD/99FM0z5lnnlnNOeecav7554/WsuSSS6pllllGrbbaamqttdZSrVu3zjNsxTcff/xxtH/M4c0331STJk1SzOuPP/5Qs8wyi5p11lnVAgssoBZaaCG11FJLqeWWW061b99edezYsZTx//77bzVy5Ej1yCOPqHHjxqn3339fTZkyRf3666+K5G/m8Ntvv3mvMxR6CGUeMeIacVbrRd8+gqkR69eJdvLkydFZf+qpp9Rrr7027ZzRZq655lKLL764WnXVVdUmm2wS8cv55pvPm+ZtDX1wkjRAk47Ku/7669XJJ58cMVMXgOTTTz9dHXHEEcqGMNf3tt/Z5HPPPVeNHTvW+3MYO9/stttupc3De3Ct4XfffadOPfVUdd1110VCNC8UqV346KOPqn79+qknn3wy7/CR4EiDtMPxzz//qGuuuUb16dNHffrpp4ndtGzZMhKSLgiFHhoxDxcTqvdZrTd9h7Z+nVY/+ugjdeaZZ6qbbrpJIRx9AJrfc889o7PRtm1bn09K5WdNUjDBSPfZZx91++23eyFMb9SzZ8+IGRW5tXz55ZfR+GjYeYEb1N133x3dBOoNzz77rNphhx3UN998U3hol2CwDfD111+rXr16RbfMouAaP4lhcCNCORgxYoRzCtBK2oEOhR4aOY8kPDfirDaCvkNav07QQ4cOVUcddVRkRcoDWEsGDRqk9t13X+fnZSn8DNTkBBMmlW7duqnHH3/ciaikBr1791aXXXZZru8nTpyounTpor744otc3+sfYZKCMS699NKF+/LtAHPZlltumZtQzXFcgsFsD/4waWLuLANc49sOC+adzTffXI0ZM8ZrCjPMMIPC3GeDUOih0fOw4bkRZ7VR9B3K+nUaPf7441X//v29aNzV6JRTTlHnnHNOarNmLZj2339/dfXVV09DED6H/fbbT2211VZqiSWWiPxIXOPxN2E+uO2226qQCQKxs2600Uau/aj4Hd/DOuuso7799tuq7/C5oIFjn8Vch+kQLQUT0WOPPaaGDRsW2XVNWHHFFSO/xuyzz55pLnkaY47CN/PWW29VfY6/iPmvt956kaCce+651Ywzzhj5er7//vvoG3wWTzzxhHr66aen+VxcgkEfiO833HDDqD8T8Mdtv/32auutt1YdOnSI/Fn4CRmf/WT8V199NcIlGnFsWnONbzss3JpvvPHGaVPAvo7ZAoVn5ZVXVgsvvHBklsBE/Pzzz0c3bJu5MRR6CGEeNjzX+6w2kr5DWL9+pgYMGKCOOeYYK5vYdNNN1e677x75vfERM3cUxeeeey4y9yWZ1gcOHBi5QpKgWQumGCkg4YwzzlAnnXRS5KBPAgIjdt555yofwWabbZbp1oUpZ/3111cvvfRSxVCY4q666qrIWZgGaNzc0iAWU/tGsOrCNo/Q8fnmhhtuUHvttVdFU4TPkCFDFEzEFzDPYEa9/PLLvW8dBFSsvvrqCnu3CXvvvbfq27evdyADgRm33nqrGjx4sNO/5zosO+20k7r00ksjYZQFQqGHUOaRhud6ndVG0ncI64/pl9szgUGmX5TgIc46CmAa3HXXXerggw+uMvUThAT/I0DCB1x+t7Q+mpwpL14MjByG7gPYSP/9739XNAVpaJrcuHzghBNOUBdccEFF02WXXTbSLtq0aePTRdQGQdmjRw+F412HF198Ua299tre/eRpiPDEMa7D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AcFAk8eACKYmvIXffPONeuONN9Sbb76pPvjgA/Xxxx+rTz/9VH377bfRv19//VX9/vvvaoYZZlDzzz+/mm+++dTSSy+tNt54Y7XJJpuoNddcs/TV//jjj+qee+5Ro0aNUq+88or67LPP1A8//KB++uknNdNMM6mZZ55ZzTnnnNF8FlxwQbXkkkuqZZZZRq222mpqrbXWUq1bty59TkU6/Pvvv9XIkSPVI488osaNG6fef/99NWXKlAi3lEiZZZZZ1G+//eY9xOuvv67uv//+CD/vvPOO+vzzz9Uvv/yi5phjjggfiy66qNpggw1U165dVadOnSKc1RK+//57deutt6pHH31Uvfbaa+rLL7+M1jP33HOr5ZZbTm244YZq3333VSuvvLJzGuDlrrvuUg8//LCaMGHCtL4WWGAB1bZtW9WlSxe16667qpVWWsnZV54GkydPjmjvqaeeitYyadIkBT0Cc801l1p88cXVqquuGtF+9+7do/MwPUOjaQ06uvPOO9UDDzygXn755YgX8DdovU2bNqpdu3aqc+fOaqeddor2R4dmLZiWWmop9dFHH1Ug5L777lP/+te/vOmVA4tg0GGJJZao6jetQxjVtttuW9GEuSFs0sC2ed4TV0qts8466rTTTlPdunXL8pm17XfffadOPfVUdd1110WMNi/Uqh6WbT5pxP/PP/+oa665RvXp0ycS9knQsmVL9ccffziXC8M899xz1dixY51t4wYIbb7ZbbfdVJ69TlsfCkvfvn3VhRde6Nwv+tlnn33UoEGDIqXChL/++kudf/75qn///pESkgYzzjijOuyww6KxZ599dm9cpDXkDJ955pnqpptuUn/++adXn+zbnnvuGe0vQtMXVl999Ujo6nDiiSeq8847z7eLxHb0Ax51aN++vRo/fnymvhtBa+YEhw4dGvGDr7/+2jl3hNLxxx8f/UNxBZq1YOrVq5e6+uqrKxB35JFHqosvvtiJTBp88cUXiRr+e++9F90EfIAxBw4cWNGUubG5aZCHWdn623vvvdVVV101jSh85qy3efbZZ9UOO+yguMEVhRAEE5o/wmDEiBHO5XCjSWOG3EBg6ty48gI3qLvvvltx88gCSYebfUIRGj16dJbuIg33ySefjG67MdDXNttso8aMGZOpr0033VQ9+OCDarbZZsv0nY0BHnXUUernn3/O1Q+CFoHLrdAH4A1HH310RVO0f6wVWCbyAooQNzpuFTowHvzBBxpJa/H8sCTsvvvu0c01K6y77rrq3nvvVQsttFDzFkw333yz2mOPPSrwh0nJ1IiSEHzjjTdGWpcNhgwZog488ECvvWHMV199taItc4M5pkFZgokxNtpoo8hkFWssXhNXKjJJbbnllrkZgzlOowUTpp/NN9/cm9HCjDD32WDixImR+QoFpihgVkNQYor1BRt9/Pe//41MuZhZ8wDfIpzoG3Px+uuvr95+++08XUX0DZ3nBTRsbmllwCmnnKLOOeccZ1fcABZbbDHFLVEHFA/MUnkBU+pWW21V8TlKD4IKRu2CRtMa8+MWzhqefvpp13QTf+eG+Mwzz6hWrVpVtakVbwiuujgaBjZ9HThwEJ+PdoqWde2111qRvMsuu0S2excw1iKLLBL5K3RgbgsvvHDq5zHjgTliYoChYkNfYYUVIhsuV2TMJfh3GAczEvbeO+64w6rlH3PMMZFpxxcwYUFIb731VtUn+ItgPOutt17ETPFZYMaB8ePX4Bts4E888UREyLGfplbEZ1uTjXH37NlToXDEAA5RPjB3YrZlT/gOhvH8889H5j4YtQn4ojCVwrxNQBEBN/g6MNfh60Djx2T42GOPqWHDhkU+EhNWXHHFyM/lawKzrQ9FDJNXDNzGuDEzF84CmvuHH34Y+YouuuiiiHZMQOniRr/FFltUrB0hRV8IL/qCLjFH0xd0ZesLhoxikxUGDBigoFcbcBtDa2dt+CzBA7685557Llq7bb/oB6vFEUcc4ZwKt03M7zowno5XZydGA/bFFNK4FHAtuCAEWmOO++23X3QeTOBWzPrwL8Kb8KXCj+ABt9xyS/RP99OCS5vCUiveEJxgAoGrrLJKFECgw2233aZ23nlnFz1EV28crDZAy0G4uG41jMWG6cCcbIzJHGeNNdZQ+++/f8TkdPOKa+KYHTAv4STWgbm+8MILiiu1D9xwww1qr732qmiK8IFxMS9fwCd1++23q8svv9z7puLbd1o7197glL300kudCoI5BqY9mPRLL71U8RPKDiZTHO9pwA3ssssuixiveRvj8Jvm56S+0tZH0AZzMfdP7wuGR/CDeePD/9m7d2917LHHRs3pC7NzkvWANpi26YszoQN4QmBkAW4HHTt2rPLtceagve233z61OwTlwQcfXGV6nnXWWaM9Q7lLAxz6O+64Y0UTmC9rQwHLCtxiUU4xg+nAOD169EjtLhRaw9piuzESYIXARiAlAfwXYeSyVDUrwYSGBPPR4aCDDlKDBw9OJYh3331XLb/88tPaQJhcveMoIH7gAGGXTwPMfaYviTmZPqesxO5qjyliu+22Uw899FBFU9+bHh/BYE1bclmOYNf8y/g9jXFDA1deeaVTsbDN44QTTlAXXHBBxU/LLrtspKlzk/UF7O0wJm4xOrz44otq7bXXdnaTtD6UB/w7punI1iE3ONuNhtsQ86IvovB8bj02cxVjZvHHMibWAdP0jWLGzRulzgf4npsdt3cdsABg5kyjDSwF3AgJ+NGBc8xNMiugaJjfcYtGIXCZ1kOgNUx44B1FRgcEPEqHzSxn4ghcoqTYrC9x22YlmGCspgaLPZ9Q3jRAcB1yyCHTmnAw0RwxlcXg47iEYZkbypwQGrUGnPwEaOgHjGilTz75JNLgXGCLaszCZFz91/r3JOYD40NzzhOqDTPBPKdH6nEw6Q+6ygonn3xyVcQXt3lu2i5IWt9xxx1XJTjT+iJsPSlQ4qSTTooi7HwB86YZKOFzTuL+MW3Zzsbjjz+uNttsM99pRO2SBCVn2BWpSmQhN3wdMB0SCJQV8O+a33Ej5dacBqHQms3XDi/kJpTFJ4qyjzBLinJtVoIJ5oy2ZWqlMOe0MFLMPPhqYujXr1+k3egRO0QrmbZondAYg9ByHdBA8Uv4aBlZD4Ct/emnn67OPvvsip98Ai/4AF+HaX5Ae3JpeWXMu4w+khg3TAImkwdsgoQQYBz1eQC/DDSiKw/QCCZk0z9q9m9bH1Fo+FvMvJG0uRFgYJs/fdCXLYQ8qT9ukmj5OmBOJM3AB1AAucXpgP9C9wv69BO3wUIwfPjwik+4SboiMlE0bLfWrIoZPjiUU5Pp0j9+2jQIhdbwT5oBD3ktJ2kBLc1KMLHx2KvN/BKCGnDk2gAE4cDTHdsQEgwZU0AM2JthKDASG+AoxGegA3PJGnqb5SCabdGE0Yh18A2ZJ1HOzFnCN+ZrTiky7zK+tTFuAhwIysgDaHrcNHXzEDTw1VdfKfwXeYFw6EsuuaTicx/lwbY+nzQEc54EqBBYYwJmaHw6WcDWFzdUnyhBAk5QFk0GhWaeN2kXkx7BKDqANwJRXMneNv80eYFnnXWWN0rIoyIHSwcfGgyF1vBXYyHQATMve+VjdTERhaLDHpsXBdo1O8FkS2xL0+I4RB06dJiG03nnnVeRdQ5BE7Wl5/MQTp0UTICz2NT08moa3ifBaMi8EbI64KQmZNMFmAHNJGBuieTc5DGDucYr+3cb487KWPQ5ETiCnVwHovwIEikCtgTsQw89tMqUZI5hW5+PQDP7gUnbrAdEU5lH57eEAAAN3ElEQVSBO6512voi/DotiTnuk5sNNxwduFWYQSauOZi/E0RkJrESjGMGOJjf2W5/3G6JanQF1sSMljNEex18btih0BqBDdC4Digx5q02y55gkrVFTjY7wWSzNeOkToq4I/QVO30M+KiI9AE4qLr9n8x9rtw24ECiIeiQN3w2y8brbWMHtv43Hx8b7RHeNqaLH4GcEAjU54DmnXvR72xzI+DArMLhO46NURH5dsABB/h2YW1HZQP8eTqg7KD0pIFtfTiX0yKkbP0R0GOLNiN/SQ8A8lmkrS9MgkSmucB2cyyiSMTjUaGAc6oDJnnC5dMgSbvnVkjIugtQ/gjA0MHXTBsKrdmKA+BzxPeYF9gL9sSEZieYMEdx6zGdbkkHjzpmug0aJyXOSgBGRERXDEh/HLMmwCBM8wMOQ8xAebPhWQcRUpgliQjE3s2BhxlkyYwn7BbzkwtYF7ksSUA4PUyeNtzCQqtNZmPcWX0E+tpxypt5J0X8VXHf7J3px0HTZq5ZBROmZWg9C9iUF74vqy/2wWa6MedoCxLgdu4KD3et1Rb+jcAw0yls/ZBAbVb1wAWQlN+o92HL+6E/zrALQqE12574BI+krc9mIaB9sxNMLBpCNM1XhAuT76ADeQMcbJ3RUyuP5EeACDucmTHgW0DYmD6GK664Ypowi9v6HgZzUzGnYafm1mZLYnQRufk7vjKCGHzAdkBs38F8iLiBkHGWslbThOgzXpltbIIJv2FeAWozCdn8i7YDZv7NdQihQTNc2cSNbX3kReUpnVPrvlzrZW0ocmY4MdGzeaIddVyhgMbnN/67j5+HtiTRmxVa8L2S05QWFIISiQ9GTy+hP1/zaCi0xu3bjGAuotyBAzMVJ94THxrJwx+CTLCNF4LD8owzzqhYFzZmbM06oAHDXGPAQWrWt8IZiFMwBlsoK7XlYvOfPgdME1mA4pHMPUuFa5/+fYmAg7X11ltnTpKE0YFH/GxEVRUJDvBZT5KwNP+O4pHXP4Z/gUjLekBaKaR4fJsw8d1XHyFX776IQjQTdKkgUFTBoQ+zygpjmWZ2275y7hAwZvHatOAp+rGFWBOJy/p8zkIotAbezEKt+Nh9KucknRO+t5VhyktvrvMYtGCivIwZIgxyQbp+wM0oGhjr9ddfX7F284qOj0m3YWO24DCZGi/JaKbzPA2pNpu7axN8f89CBDBz1pdUwsY1Jr42vk+KgnR9n/f3Mhk3c8BXUsaN1Xc9rj0qc30h9AXDNm/yCAZM4EWAPk1hwP/NVIikMWxJ8lgFkkof0Y8t7D1LlGMotGbbk6IpI7b9AGcues9LA0ELJpgrJhyTsRCto4eA4yvRS6jYNCMzUsV0VPM2ifkWEtd+BBUJrj7AuEkVkTFLkItBGDiaFRFV9A8R2Q5xWUwHTYcQeLRBMzPfZ02USSILPo+pyaf/Wt4C6JubVlJB1zzzc33jOqhl7SvzCKGvUAWTLUIOfBFtZ+YpgksiEPm76VdDOaa2pA+EQmsimHx2q2AbTFKm45FbQJw0i18J277+zAGRe2aZGfM5DIgIoRMnNZpRfUybsSkT4wOYz7CrmwEKmBT+85//OLPW9TEI+LAJKxfTc80TMwhJd/zDd2e+WZX0fT3D5ctktqwH4W8GmeBfnGeeeVzoqsnvZa4vhL5CNOXFG0d0Ir4RHTCx20zzmN/NSF2+z1KlPRRaE1NeTY5uZac2gUFpkrjMEEILAaITYxIxmQ8IEmlCjk8shEwByNhJ1ZLNpduKp0Ko3O5834CK+0S42RLhigomc86YRIlyApf8M2uUxe0JFsCZmqWUSV7SKJPZMgfTt8jfyHkjgbQRUOb6QugrxOCHeF9JjzCFUFLkJBYNk2/wPU9v+EIotFaL4AeCJ2wBLWXzpBjXQZvyYiaiJ87yN2453Ha49VBNWc9toFYe0XU2OPzwwytqXcXVFJJMhlkYmJkrxfiUFjIzyH2InEoNtkKztSIC5oRfgOgjchVsDmbKkpgvefqsJWubMpktY9siO30SNbPO27d9mesLoS8bfssIFycIiWAkHbJGyBL0grAwz42ZLkABXjPhHtM1Zj/SK3whFFqzhYtj+dEVeN81xe1QXG2viNeKJwUvmFg4AQ9mUAI2ZPw1ZogmtfJMgo6RaxaHhfmTW2QLsqBWH/4Z32RUm8aVRbDphEKNMnw7JtSKCPRxWDM2dTMfhxpkHOBaQ5nMlrnaKtWTbkDaQSOgzPWF0BcmdfN16bwKmb4f3HTMRwKzvk1GfySUk1yrA8+/YF6PgYodJj3kqZQQCq1Jgm2dTjYh4iTc6QDRkjRLCGPMsNFyYKxJOS9mcVgONmYziNInLD1tuYxpmsIIV83zFowtooix6yGYGIcbhfn2VfyQWK23vExmy1xRVCjuqwNaMJUbfJWOMtdc5vpC6MtGK2UoMQQiEZCkQ5rSmbRHROeakaWcSULASZon2gw/mXl2+S7tLSvbeKHQmpQkKvPEpvRlS3ylegOar85AMfnxmmgamMVhScZDMJmVeBlTf0LDtVQSYPUADNrnCdEkyY88LDMHo56Cidup+cghkYlJpe9duMnye5nMlnEJSkF5MXPKfB58yzJv37Zlri+EvpKKuOYpjRTjkIK95sOArJWxXNXbzX0g8AV/rRnZS5QquXo2YYJvGMFFUm4WCIXWbEVc8RODP9cL3Lb1EjhGMJkUcTWwY8sCJySS4pF6aX6fN23M4rAUO0TrM3Mxsh4sWyQMFSeyBgzwQGLSU9L1ujGRK2I+Fd5Ub0yQEmZR8wkHqldTJso3FSALg0prG4Iwsc2vyLxIg6CepA6+JYBsc+HlVPydOviWBbL1RwqHWY6InCXmjN9Ef6+N72k/bNiwXFseCq3Z/F1m7qbvAm0PH8bf1oonBe9jihGAxDarOcBU9FsKtfJcL4CaxWEJoODlWB3SisUmbabN9KDX6/MhAsLcKdtvlkSpNRGYc+PWab47gy/PNK34rClrmyIMMmkswuLxJ5r5TDwsZ76UnHW+WduXub5Q+rLVUWNupCRkfUMrqdYjrzpTDzMPEHlqFnDF7M9TNgQ9mOef9mYhV99xQ6E1WxULlHnmZz6JkbY2lGt4UlI5tGYvmJKqZsdIxZSGndjU9E2kJxWH1dtleSQt/s7mBCZhj+AKHz8T5jMKq6a9geNDBETkEFnXuXNn37NU1c4WYVivXKYyma2+sKSKHOCK3JYi/qaRI0dGjnrTHGzbgDLXF0pfmHhQXKB1HTChEgHnW+0cEx70awY6EdqPUpR3jzg3WC7wK+pA6Lj5UjUV4/lb3rHoPwRaw3SNQDGfwKEwAQqDD0/CJ49ikfYWmg9PysOImsyNKa2qAguHoH0YA21trzvqyHPV1LIh2pZpTjs0NfwZadWjJ0yYED1XYR5scxwfIogPFDc4yjDh+PetW4ZWxLV94MCBFUNjn2Zu5IHVGspktvpcOahox+DaBIQ4L8Kaj9OlrZUgG/wTVNWI3x7Ksj963z7fhS7koA/8t6YfEp/Q0KFDnQnmPG1C0I9Z4w0tH5Nr0YcuCW7yeSyQdpQ4KwKh0BoKk01BZZ8IkEgrtMvNCh+c67HIvLTrwm+TEUyYudJyCsgXIkzVB2zFYfXvbJUjfPrlxmN7TgPnK34jTBFoadzucK6SfIt/i7eidHMC0UC2N5V8iMBk7JgqKdlEaD3RUiTfEUGIoMS0hXZKdWhCavHD2B6HI1cMxl0PqJVgYu6Ygql7qBfzjdfEuOwfvgy0RGoFxgEg3MRjPMEkCZvnJmCagPLsD+P7fBe6YGJ+AwYMSExIx6eD74hUBIQV+CZfjlQNmKTt3NAnSlKSzzULPXILghGn4Zo5kSaR1S9sm0cItMa8bM948HcsS/jX8dOT6kJKDsoWAomAMPZEDxhi73jQMo+ynGWfpp3HqXlPRZ7RCn4DYSW9d5Ol2Kotbymemu+DfLalcG1GG3E9fZCGBh7045DayvP7bFURE4RtXlTZ4MZXtCin79bXUjDFwolEQ9ft1He+eru8++PzXVMQTMyRROyylJi8zvqkvbMlnuptfV+J9qUNhFMjaY15YgXh1uTz+nXSumLzH5XWRTBZsER4+JAhQ6p+yVpsNanSAx0XTb5EQPJIGm8IZQUIiNsTddzyMuiyBBP9EC6Pxpr3yYms66d93nVnGQtNEJ8ZwSllFnj1ETBlri/UvjDdkeSJPzcPcJ4HDRqUWBA5T598QzHiXr16JX7O79wwyoRG0lq8DvaBGw/m0qyA+Zvv8BeWSW+ueTQZUx4LsSXz8fcsxVZjhHATINLHhOHDh1clZLqQaP6OqQim7vPqJd8Sak6mO9/EVbzzEgFmOQiJV1sxOWVlvIyPSQtzJ7e3ekPedeeZJ2YLyiyhDOR5OwtckTuHItKjR4+q149tcypzfaH2xboJNMBXg/nHzO9L2iuibDEvYZan+n7ZwMvRmBFtAhPTFub1uKhz2WM3gtbMNfCSN3zG9OPZ1goeSL/B54zrASiT3lz4bVKCybWY0H4n7BoHOUEZHNT4FkVEDNE/RDIR3k4h2Xjzy1wDSYWjR4+O/nEwqLSMeYFwdA4nme9cz/GBcV0nYILXb/GvNCcAT6Qa4DfC78deTZ48ORJWMEsSLTmopBHgfyDKDKGNNlkrRja94B88UjuPM8CzK/hv43QIcIffmFB+ApIQ8GZi9/SCh3gdjaY1aBqeRIg/gQ34lAlYQTBz7gkAwnJD0JRP5F6t9ud/YPlPtYFbbZ0AAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKEAAABRCAYAAAC6w8avAAAAAXNSR0IArs4c6QAABhpJREFUeF7tnGuO3SAMhdutzOx/SbOWVqmEZFl+HAMmTe7pn6q9YJvPB0PI4/fX19efX/xDAjcS+E0R3kifrv8RoAgphNsJUIS3p4ABUITUwO0EKMLbU8AAKEJq4HYCoQh/fn7cAL+/v39dv19/r/7ZZWc1Dva/hwBcCS2hUDz3JO1tXreIcFRMqyrKaupVTS3m8W9t1/MT+ZB9vIk0kurFL//fitXq743JE5A3BslixIEwfZJQl0V4DVbCyRKGJlrb9fxEyZa/WQJGhILav+LT/iIWUiSZjwrjJ4lvxLosworovOU7E0P2u5fQrF/2+7BrVSMtuhURauFUxPyGLVG7CDVgtBJWxS39VCpzJb5MtBXxWMJDx4DE/KSK2C5C5Oq5ktxKxanajfZr1mlAtozuWo5RO08Snoz1qAg7luNo37djT6iX5MpeDhUPOoZsC0ARqo25TJ519YgmEwEfXQGvXh1HIhyxeeOTV7Hy4sISixenNXE/9ur4qbMsEntlTG+4AKiM92RbeDk+GdQuX5VKFPmkAHdlxLbzahH2oqP1XQQowl0kaWeaAEU4jY4ddxF4hQijQ+JdoLSdJ+0Td8ZasYW2fZ0Iu0RHEdbJbhOhdd80O6dCz7ysOw7RmaLlV/+fdxdDxqSPbcYZXgYNOY+0zgNRXtFZosyD1w7hE51RSrsRR30XbNbviCWthDp5XnDDoF4akYFdbSp2dftoOY7ij2KNKl+Fycq4vMlS5RVNrig+rwCh9/WzSV0SIeo0g4MM2BKzZVcnqPLQAtrW8xFNgspv2bhQ/1XuqN0ZEUa2vQUdqoRahNoYKtJMhJHdAXq08XxWKk/WtpqsaDWQtpDlLKrEmeiyiWBVWC8+hJG33ThWCSuwMhEiT9x4iUarW7Z0V5/+zgSBJsJbAdCVYZYtslRHzKL8o2OfqoSVyncFiQgkm3Eo5Iqd2T1hVmkqQs/iPS1CK/bZ8bSJMFoWJbAhPgtyVPqt5VbblcKW8VSf+cv6WrN8JnZvucrGhW4HMjv6QioaV1YwLGFFy7HOlfZ9/TuthFanyv+hs6Fis6vtk2LtYnCH3Y8WoZzByIy9I0Gf4LNdhJ8AkWNcI0ARrvFj7w0EKMINEGlijQBFuMaPvTcQaBXh3Vebd/vfkJ+SCfTM0TqiiW4UdHNsFWGJYEPjbngNIW81iY4/a5f9vho0JMLoMNI6IB5BRQfVyMzzDlmzw98Z/yPWzKd3ID58WveFM0ZW3+wOUbXP1R7Jo3VUNZtHVJypCBEYyP3WylKhhVC5bSQHXumH+ozajURbD3xUP3/i8cryMfNgR2VMlTweEyFS0azkRAHOgo72Ohm8WZ9VuzPjjpbDykRbmaDZ7TxUcFa75UqIijBaDrKN8mnQetJkAtXxo5//0Ez0Uii3CNHjdKhA5HIsfVUmkrZhLd9VQR4VoTcTny7CykSMGCBLcDYhZpfjypNRlUfuEEEeE2E229DkzNrJ+qHJreyfsm2IrvDoRYGsfGhFi3xVxpRxRESn26QiRK6qPMdWwKNtpXrstOP5z+DKRFXiifZzkq13BW3192KZHYNc9tGJYHHMxurpBBLhjLrf3GcW9puZrIyNIgToeRt6oCubAAQoQgASm/QSoAh7+dI6QIAiBCCxSS8BirCXL60DBChCABKb9BKgCHv50jpAgCIEILFJLwGKsJcvrQMEKEIAEpv0EqAIe/nSOkCAIgQgsUkvAYqwly+tAwQoQgASm/QSoAh7+dI6QIAiBCCxSS8BirCXL60DBChCABKb9BJIRchH2XsTQOsHPhdMyCSQEShXQvm+xXhD7HKSvZwdvVM7grS+42L9pmMYbZDYMiD8/TyBKRFab/zL1watF6mRF7vl8NH2+n3aKLbzeOkRIfAYEcpqh3xlwBMnAoVtzhJ4jAizSnthQ6riWbz0hhDYLsIhBulcf7ZC7vOyz29U94RcjpG0/19tUhFWw80+RVG1x/bvJ7BdhLoS7v6C0/tT8nkjbBHh52HkiFcIUIQr9Nh3CwGKcAtGGlkhQBGu0GPfLQQowi0YaWSFAEW4Qo99txCgCLdgpJEVAhThCj323ULgL/E12L9WB8ldAAAAAElFTkSuQmCC"]
            .includes(src) || GM_getValue("blocked", []).includes(src);
}

setTimeout(async function() {
    'use strict';
    var hold = document.getElementsByClassName("header-social")[0]; // get hold for link elements
    var el = document.createElement("a"); // create link
    $(".header-downloads.js-download-last-home").remove();
    document.getElementsByClassName("header-logo")[0].target = "_self";
    if (document.location.href == "https://prnt.sc/") { // if on the homepage
        el.innerHTML = "Random image from recent tweets"; // set text
         // get text from new twitter posts, find prnt.sc links and get random link
        el.href = "https://" + document.getElementById("twitter-feed").textContent.match(/prnt\.sc\/[a-z0-9]{4,}/gm).random();
        el.target = "_self"; // make the link open in the same tab
        hold.appendChild(el); // add link to the hold
        // check if image is a "not found" image, if yes click the next image link
        if(isNotFound(document.getElementsByClassName("under-image")[0].children[0].src)) document.getElementById("nextimage").click();
    } else { // if on picture
        document.title = "ID: " + document.location.href.split("/").slice(-1)[0];
        document.getElementsByClassName("l-grid-right")[0].children[0].remove(); // remove facebook like iframe, it's 🤮
        document.getElementsByClassName("page-constrain")[1].remove();
        // SCUM WARNING!!!
        $( `
<h2 style="color:red;">WARNING:</h2>
<style>
blockquote {
    padding: 15px;
    background: #eee;
    border-radius: 5px;
    width: 50%;
    margin:auto;
}
blockquote::before {
    content: '"';
}
blockquote::after {
    content: '"';
}
</style>
<blockquote>If you use prnt.sc to illegally access [cryptocurrency] accounts that are not your own and then try to steal money from those accounts then you may be making yourself the victim of a more elaborate fraud/honey pot.
So basically "Attention thieving assholes, there might be other thieving assholes out there looking to thieve your asshole".</blockquote>
<a href="https://linustechtips.com/topic/1370961-attention-prntsc-browsers/#comment-14973952">- CerealExperimentsLain from LTT forums</a>
        ` ).insertAfter( ".image-constrain.js-image-wrap" );
        el.innerHTML = "⬅️"; // set text
        // convert link ending from base 36 (lowercase letters and numbers) to base 10, subtract 1 and convert back to get previous link ending
        var ht = (parseInt(document.location.href.split("/").slice(-1)[0], 36) - 1).toString(36);
        // set link, if the link ending starts with 0 it would go to the homepage, so if it starts with 0 make it start with 1
        el.href = "https://prnt.sc/" + (ht.startsWith("0") ? "1" + ht.slice(1) : ht);
        el.target = "_self"; // make the link open in the same tab
        el.id = "previmage";
        el.style = "font-size: x-large;"; // make button big
        hold.appendChild(el); // add link to the hold
        // make another link
        el = document.createElement("a");
        el.innerHTML = "➡️"; // set text
        // same as previous but we add 1
        ht = (parseInt(document.location.href.split("/").slice(-1)[0], 36) + 1).toString(36);
        // same as previous
        el.href = "https://prnt.sc/" + (ht.startsWith("0") ? "1" + ht.slice(1) : ht);
        el.target = "_self"; // make the link open in the same tab
        el.id = "nextimage";
        el.style = "font-size: x-large;"; // make button big
        hold.appendChild(el); // add link to the hold
        $(document).on("keypress", function (e) { // if key pressed
            if(["n", "N", "т", "Т", " "].includes(e.key)) {
                document.getElementById("nextimage").click();
            } // if pressed [N] then next image
            else if(["b", "B", "и", "И"].includes(e.key)) {
                document.getElementById("previmage").click();
            } // if pressed [B] then previous image
        });
        // check if image is a "not found" image, if yes click the next image link
        var notFound = isNotFound(document.getElementsByClassName("under-image")[0].children[0].src);
        if(notFound) {document.getElementById("nextimage").click(); console.log("skippity skoppity the image is now gone-ity");}0
    }
}, 100);