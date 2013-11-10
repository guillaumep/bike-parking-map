import ConfigParser

class VeloConfigParser(ConfigParser.ConfigParser):
    def as_dict(self):
        d = dict(self._sections)
        for k in d:
            d[k] = dict(self._defaults, **d[k])
            d[k].pop('__name__', None)
        return d["app.main"]

    def __getitem__(self, key):
        if key == "prod":
            return self.getboolean("app.main", "prod")
        return self.as_dict()[key]
