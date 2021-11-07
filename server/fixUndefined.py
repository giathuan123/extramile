from difflib import SequenceMatcher
import json
def matches(correctCounties, wrongCounties):
    return SequenceMatcher(None, correctCounties, wrongCounties).ratio()

with open("./undefinedCounties") as file,open("writeback", "w") as wb, open("./newCouties.json", "w+") as out, open("./routes/counties.json") as counties :
    changing = set()
    writeback = ""
    datajson = json.load(counties)
    count = 0
    match = False
    try:
        for line in file:
            print(count)
            for [key, value] in datajson.items():
                if(matches(line, key) > 0.9):
                        if(line.split(',')[1][1:3] == key.split(',')[1][1:3]):
                            match = True
                            changing.add((line, key))
                            print("Changing", key,"->", line)
                        else:
                            print(line.split(',')[1][1:3], key.split(',')[1][1:3])
            if(match):
                writeback += line
            count += 1
    except Exception:
        pass
    for (line, key) in changing:
        datajson[line[:-1]] = datajson[key]
        del datajson[key]
    print(json.dumps(datajson), file=out)
    print(writeback, file=wb)
