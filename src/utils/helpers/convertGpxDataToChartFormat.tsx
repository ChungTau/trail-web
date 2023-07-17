import { Units, point } from "@turf/helpers";
import { distance } from "@turf/turf";
import { Track } from "gpxparser";

export const convertGpxDataToChartFormat = (gpxData : Track) => {
    // If no gpxData, return empty array
    if (!gpxData) 
        return [];
    
    // Initialize empty array for converted data
    let chartData = [];

    // Initialize distance variable
    let totalDistance = 0;

    // Loop through gpxData points
    for (let i = 0; i < gpxData.points.length; i += 10) {
        // If i points to the last element, or any element that is not multiple of 3, or
        // the first element, then process the element.
        if (i === gpxData.points.length - 1 || i % 10 === 0 || i === 0) {
            // Calculate the distance between this point and the next point
            const from = point([gpxData.points[i].lon, gpxData.points[i].lat]);

            // Calculate to-point only if there is a next point
            if (i < gpxData.points.length - 1) {
                const nextIndex = Math.min(i + 10, gpxData.points.length - 1);
                const to = point([gpxData.points[nextIndex].lon, gpxData.points[nextIndex].lat]);
                const options = {
                    units: "kilometers" as Units
                };

                // Get distance from current point to next point
                const segmentDistance = distance(from, to, options);

                // Add segmentDistance to totalDistance
                totalDistance += segmentDistance;
            }

            // Push an object with elevation and distance to chartData array
            chartData.push({
                elevation: (gpxData.points[i].ele >= 0)
                    ? gpxData.points[i].ele
                    : 0,
                distance: totalDistance
            });
        }
    }

    // Return the converted data
    return chartData;
};
