import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './point.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPointDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PointDetail = (props: IPointDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pointEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pointDetailsHeading">
          <Translate contentKey="specialistSchedulerApp.point.detail.title">Point</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{pointEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="specialistSchedulerApp.point.title">Title</Translate>
            </span>
          </dt>
          <dd>{pointEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="specialistSchedulerApp.point.description">Description</Translate>
            </span>
          </dt>
          <dd>{pointEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/point" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/point/${pointEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ point }: IRootState) => ({
  pointEntity: point.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PointDetail);
