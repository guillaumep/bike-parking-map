import csv
import geojson

CSV_FILENAME = "support_velo_sigs.csv"


def main():
	csv_reader = csv.DictReader(open(CSV_FILENAME))
	features = []
	for row in csv_reader:
		point = geojson.Point(coordinates=(float(row['LONG']), float(row['LAT'])))
		features.append(geojson.Feature(geometry=point))
	collection = geojson.FeatureCollection(features)
	print collection

if __name__ == '__main__':
	main()