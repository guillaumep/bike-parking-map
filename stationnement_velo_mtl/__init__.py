# -*- coding: utf-8 -*-

import sys
import pymongo
import stationnement_velo_mtl.views as views

from stationnement_velo_mtl.config import VeloConfigParser

from argparse import ArgumentParser

from bottle import run


def parse_args():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument('conf_file', help='configuration to use')
    return parser.parse_args()


def main():
    args = parse_args()
    config = VeloConfigParser()
    config.read(args.conf_file)
    confs = config.as_dict()["app.main"]
    views.db = pymongo.MongoClient(confs["db.connexion"])[confs["db.name"]]
    run(host=confs["server.host"], port=confs["server.port"])


if __name__ == "__main__":
    sys.exit(main())
