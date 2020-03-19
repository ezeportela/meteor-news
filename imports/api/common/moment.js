import moment from 'moment';

export const getPeriod = (months = 0, period = []) =>
  parseInt(
    moment(...period)
      .add(months, 'months')
      .format('YYYYMM')
  );

export const formatPeriodValue = period =>
  moment(period, 'YYYYMM').format('YYYYMM');

export const formatPeriod = period =>
  moment(period, 'YYYYMM').format('MMM YYYY');

export const getDateNow = () => parseInt(moment().format('YYYYMMDD'));
