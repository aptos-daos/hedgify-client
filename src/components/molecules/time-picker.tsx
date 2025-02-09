import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const TimePicker = ({ value, onChange }: Props) => {
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [period, setPeriod] = useState('AM');

  useEffect(() => {
    if (value) {
      const [time, meridian] = value.split(' ');
      const [h, m] = time.split(':');
      
      let hour = parseInt(h);
      
      // Handle 24 hour format
      if (!meridian) {
        if (hour === 0) {
          hour = 12;
          setPeriod('AM');
        } else if (hour < 12) {
          setPeriod('AM');
        } else if (hour === 12) {
          setPeriod('PM');
        } else {
          hour = hour - 12;
          setPeriod('PM');
        }
      } else {
        setPeriod(meridian);
      }

      setHours(hour.toString().padStart(2, '0'));
      setMinutes(m);
    }
  }, [value]);

  const handleHoursBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === '') {
      setHours('00');
      updateTime('00', minutes, period);
      return;
    }

    const num = parseInt(v);
    if (isNaN(num)) return;

    if (num > 12) {
      setHours('12');
      updateTime('12', minutes, period);
    } else {
      const formatted = num.toString().padStart(2, '0');
      setHours(formatted);
      updateTime(formatted, minutes, period);
    }
  };

  const handleMinutesBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === '') {
      setMinutes('00');
      updateTime(hours, '00', period);
      return;
    }

    const num = parseInt(v);
    if (isNaN(num)) return;

    if (num >= 60) {
      setMinutes('59');
      updateTime(hours, '59', period);
    } else {
      const formatted = num.toString().padStart(2, '0');
      setMinutes(formatted);
      updateTime(hours, formatted, period);
    }
  };

  const togglePeriod = (newP: 'AM' | 'PM') => {
    setPeriod(newP);
    updateTime(hours, minutes, newP);
  };

  const updateTime = (h: string, m: string, p: string) => {
    onChange?.(`${h}:${m} ${p}`);
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-sm font-medium text-primary-foreground mb-4">Choose Drop time</h2>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center justify-center gap-1">
          <Input
            type="text"
            value={hours}
            onChange={e => setHours(e.target.value)}
            onBlur={handleHoursBlur}
            className="w-16 text-center text-sm p-1 bg-white/5 border border-gray-400 text-gray-800"
            maxLength={2}
          />
          <Input
            type="text"
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
            onBlur={handleMinutesBlur}
            className="w-16 text-center text-sm bg-white/5 border border-gray-400 text-gray-800"
            maxLength={2}
          />
        </div>

        <div className="flex gap-1">
          <Button
            variant={period === 'AM' ? 'default' : 'outline'}
            size="sm"
            onClick={() => togglePeriod('AM')}
            className={cn(
              "w-12 bg-white/5 border border-gray-400",
              period === 'AM' 
                ? "bg-primary text-primary-foreground border-primary" 
                : "hover:border-primary hover:bg-primary hover:text-primary-foreground text-gray-800"
            )}
          >
            AM
          </Button>
          <Button
            variant={period === 'PM' ? 'default' : 'outline'}
            size="sm"
            onClick={() => togglePeriod('PM')}
            className={cn(
              "w-12 bg-white/5 border border-gray-400",
              period === 'PM'
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:border-primary hover:bg-primary hover:text-primary-foreground text-gray-800"
            )}
          >
            PM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
