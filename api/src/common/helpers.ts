import { CoordinateRange, CountryInfo, DataTypes, downloadParams, GHCNMBasicStationMetadata, monthType, Range, whereConditionParams } from '../modules/ghcnmv2/ghcnm.interface';

function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    }
  );
}

// this assumes that the start range is always less than the end range
// query does not work otherwise
const buildRangeCondition = (name: string, range: Range) => {
  var rangeCondition = '';
  if (range.single) {
    rangeCondition = `(${name}=${range.single})`;
  } else if (!range.start && range.end) {    // upper bound
    rangeCondition = `(${name} <= ${range.end})`;
  } else if (range.start && !range.end) {    // lower bound
    rangeCondition = `(${name} >= ${range.start})`;
  } else if (range.start && range.end) {   // both upper and lower bound
    rangeCondition = `(${name} BETWEEN ${range.start} AND ${range.end})`;
  };
  return rangeCondition;
}

export const buildWhereConditions = (whereParams: whereConditionParams) => {
  const conditions: Record<any, any> = {};  // SQL statements with placeholder variables
  const parameters: Record<any, any> = {};

  // console.log(whereParams)

  // only applicable for prcp and anom data
  if (whereParams.years && whereParams.years.length > 0) {
    const yearConds: string[] = [];
    whereParams.years.forEach((yearRange: Range) => {
      const yearRangeCondition = buildRangeCondition('year', yearRange);
      if (yearRangeCondition.length > 0) {
        yearConds.push(yearRangeCondition);
      };
    });
    conditions.years = `(${yearConds.join(' OR ')})`;
  }

  // only applicable for annual cycles data
  if (whereParams.months && whereParams.months.length > 0) {
    conditions.months = '(month IN (:...months))';
    parameters.months = whereParams.months.map((month: string) => toTitleCase(month));    // months are title case in the annual cycles table
  }

  // only applicable for station metadata
  if (whereParams.countries && whereParams.countries.length > 0) {
    conditions.countries = '(country IN (:...countries))';
    parameters.countries = whereParams.countries;
  }

  // only applicable for station metadata
  if (whereParams.regions && whereParams.regions.length > 0) {
    conditions.regions = '(region IN (:...regions))';
    parameters.regions = whereParams.regions;
  }

  // only applicable for station metadata
  if (whereParams.coordinates && whereParams.coordinates.length > 0) {
    const allCoordinateConditions: string[] = [];

    whereParams.coordinates.forEach((coordinate: CoordinateRange) => {    // get range for each bound type (lat, lon, elev)
      const coordinateCondition: string[] = [];
      console.log(coordinate)

      Object.keys(coordinate).forEach((bound: string) => {
        const condition = buildRangeCondition(bound, coordinate[bound as keyof CoordinateRange]);
        if (condition.length > 0) {
          coordinateCondition.push(condition);
        }
      });

      allCoordinateConditions.push(`(${coordinateCondition.join(' AND ')})`);
    });

    conditions.coordinates = `(${allCoordinateConditions.join(' OR ')})`;
  }

  if (whereParams.stations && whereParams.stations.length > 0) {
    conditions.stations = '(station IN (:...stations))';
    parameters.stations = whereParams.stations;
  }

  return [conditions, parameters];
}