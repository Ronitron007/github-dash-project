import Modal from '@mui/material/Modal'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  useRepositoryCommitsQuery,
  useRepositoryContributorsQuery,
} from '../features/githubSlice'
import _ from 'lodash'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import { UserAvatar } from './UserListing'

const highChartOptions = (data) => {
  return {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Commit History',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%Y-%m-%d}',
      },
      title: {
        text: 'Year-Month',
      },
    },
    yAxis: {
      title: {
        text: '# of Commits',
      },
    },
    plotOptions: {
      column: {
        color: '#db6d28',
        pointWidth: 20, // Set the color of the bars here
      },
    },
    series: [
      {
        name: 'Commits',
        data: data.map(([date, frequency]) => [
          new Date(date).getTime(), // Convert to JavaScript timestamp
          frequency,
        ]),
      },
    ],
  }
}

const RepoModal = ({ isOpen, handleToggle, userName, repoName }) => {
  const { data: commitData, isLoading } = useRepositoryCommitsQuery({
    userName,
    repoName,
  })
  const { data: contributorsList, isLoading: isLoadingContributors } =
    useRepositoryContributorsQuery({
      userName,
      repoName,
    })
  const [commitHistoryTimeline, setCommitHistoryTimeline] = React.useState([])
  useEffect(() => {
    const commitHistory = _.toPairs(
      _.mapValues(
        _.groupBy(
          _.map(commitData, (commit) => {
            return moment(commit.commit.author.date).format('YYYY-MM-DD')
          }),
          (x) => x,
        ),
        (value) => value.length,
      ),
    )
    setCommitHistoryTimeline(commitHistory)
  }, [commitData, isLoading])
  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <div className="flex flex-col h-400 justify-center mx-auto mt-8 rounded-lg p-8  bg-slate-100 w-1/3">
        <h2 className="text-2xl my-4">
          {' '}
          <b>{repoName}</b>
        </h2>
        <div className="flex h-200 flex-col">
          {commitHistoryTimeline.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={highChartOptions(commitHistoryTimeline)}
            />
          ) : null}
        </div>
        {!_.isUndefined(contributorsList) ? (
          <>
            <h2 className="text-lg my-4">
              {' '}
              Contributors: <b>{contributorsList.length}</b>
            </h2>
            <div className="flex flex-row flex-wrap">
              {contributorsList.map((contributor, index) => {
                if (index < 10)
                  return (
                    <div
                      key={contributor.login}
                      className="flex flex-row rounded-lg bg-slate-300 p-4 m-2 w-fit"
                    >
                      <UserAvatar src={contributor.avatar_url} />{' '}
                      <div className="flex flex-col justify-start">
                        <h2 className="mx-4 font-bold">{contributor.login}</h2>
                        <span className="mx-4">
                          <b>{contributor.contributions}</b>{' '}
                          {contributor.contributions > 1
                            ? 'contributions'
                            : 'contribution'}
                        </span>
                      </div>
                    </div>
                  )
                else return null
              })}
              {contributorsList.length > 10 ? (
                <span className="font-bold text-lg self-center ml-8">
                  + {contributorsList.length - 10} others
                </span>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </Modal>
  )
}

export default RepoModal
