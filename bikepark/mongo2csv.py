import sys
import csv
import pymongo
from bikepark import parse_args
from bikepark.config import VeloConfigParser

CSV_COLUMNS = ('lat', 'lng', 'comment', 'purpose')


def dump(db, out):
    # ignoring _id
    csvwriter = csv.DictWriter(out, CSV_COLUMNS, extrasaction='ignore')
    for i in db.requests.find():
        csvwriter.writerow(i)


def main():
    args = parse_args()
    config = VeloConfigParser()
    config.read(args.conf_file)
    db = pymongo.MongoClient(config["db.connexion"])[config["db.name"]]
    return dump(db, sys.stdout)


if __name__ == "__main__":
    sys.exit(main())
