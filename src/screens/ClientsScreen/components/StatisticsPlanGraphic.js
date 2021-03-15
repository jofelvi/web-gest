import React from "react";
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import moment from "moment";

class StatisticsPlanGraphic extends React.Component {
    state = {
        mounted: false,
    };

    componentDidMount() {
        this.setState( { mounted: true } );
    }
    render() {
        const { Text, Html } = Guide;
        const { plan } = this.props;
        const { mounted } = this.state;

        var a = moment([2007, 0, 29]);
        var b = moment([2007, 0, 28]);
        const diasTotales = moment(plan.fechafin).diff(plan.fechainicio, 'days')
        const diasRestantes = moment(plan.fechafin).diff(moment(), 'days') > 0 ? moment(plan.fechafin).diff(moment(), 'days') : 0;
        const diasCuenta = diasTotales-diasRestantes
        const periodPercent = parseFloat(diasCuenta) / parseFloat( diasTotales )
        const udspermitidas = plan.udspermitidas > plan.udscompradas ? plan.udspermitidas : plan.udscompradas;
        const data = [
            {
                question: "Compras",
                percent: udspermitidas > 0 ? parseFloat(plan.udscompradas)/parseFloat(udspermitidas) : 0,
                value: plan.udscompradas,
            },
            {
                question: "Periodo",
                percent: periodPercent,
                value: diasCuenta,
            },
        ];

        const cols = {
            percent: {
                min: 0,
                max: 1
            }
        };
        return (
            <div>
                { mounted && (
                    <Chart data={data} scale={cols} height={360} forceFit>
                        <Coord type="polar" innerRadius={0.6} transpose />
                        <Tooltip title="question" />
                        <Geom
                            type="interval"
                            position="question*percent"
                            color={["percent", "#BAE7FF-#1890FF-#0050B3"]}
                            tooltip={[
                                "value",
                                val => {
                                    return {
                                        value: val
                                    };
                                }
                            ]}
                            style={{
                                lineWidth: 1,
                                stroke: "#fff"
                            }}
                        >
                            <Label content="value" offset={-5} />
                        </Geom>
                        <Guide>

                        </Guide>
                        <Guide>
                            <Html
                                position={["50%", "50%"]}
                                html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em"><span style="color:#262626;font-size:2.5em">${ plan.avance }%</span><br/>AVANCE</div>`}
                                alignX="middle"
                                alignY="middle"
                            />
                            {data.map((obj,idx) => {
                                return (
                                    <Text
                                        position={[idx, 0]}
                                        content={obj.question + " "}
                                        style={{
                                            textAlign: "right"
                                        }}
                                    />
                                );
                            })}
                        </Guide>
                    </Chart>
                )}
            </div>
        );
    }
}

export default StatisticsPlanGraphic;
